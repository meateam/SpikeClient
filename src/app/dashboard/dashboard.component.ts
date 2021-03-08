import { Component, Directive, ElementRef, HostListener, Inject, OnChanges, OnInit, Renderer2, ViewChild, NgZone } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ClientsService } from '../clients/clients.service';
import { SharedService } from '../shared.service';
import { PublicFunctions } from '../shared/shared';
import { ViewScopesModalComponent } from './view-scopes-modal/view-scopes-modal.component';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatInput } from '@angular/material/input';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { map, pairwise, filter, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('inputSelected') input: MatInput;
  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;

  teams;
  error;
  user;
  myClients;
  clients;
  isDone;
  clientsForSearch;
  selectedSort;
  loadingChange = false;
  noMoreToFetch = false;
  filterClientMode = false;
  skip = 0;
  limit = 24;
  sortOrder = {
    viewValue: 'High to low',
    value: 1,
    selectedIndex: 0,
  };
  sortOrderTypes = {
    viewValue: ['High to low', 'Low to high'],
    value: [1, -1],
  };
  sortTypes = [
    {
      viewValue: 'Date',
      value: 'date',
    },
    {
      viewValue: 'Name',
      value: 'name',
    },
    {
      viewValue: 'Popularity',
      value: 'popularity',
    },
    {
      viewValue: 'Usage',
      value: 'usage'
    },
  ];

  tempClients = [{
    name: 'Kartoffel', audienceId: 'dGVzdHRvaXdiamVyd3Bvb2lzaGRxcw', team: 'Genesis',
    scopes: [{ name: 'Administrator', isActive: true },
    { name: 'Write1', isActive: false },
    { name: 'AdminWrite2', isActive: false },
    { name: 'Testttt', isActive: false }]
  },
  {
    name: 'Spike', audienceId: 'MTIzNCExMzE0am5laWdvZTVlZHByQQ', team: 'SpikeTeam',
    scopes: [{ name: 'Administrator', isActive: true },
                            /*{ name: 'Read3', isActive: false },
                { name: 'Read', isActive: false }*/]
  },
  { name: 'Drive', audienceId: 'am5nb2lzdGZnZGdnZlRoaXNJaWVmQg', team: 'DriveTeam', scopes: [] },
  { name: 'Screenshot', audienceId: 'ZW9pZ3RlM2JvYmdvaWJnd0dCSVdPaA', team: 'SpikeTeam', scopes: [] }];


  constructor(private router: Router, private sharedService: SharedService,
    private authService: AuthService, private clientsService: ClientsService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialog,
    private bottomSheet: MatBottomSheet,
    private ngZone: NgZone) { }

  /**
   * Copies to textarea to clipboard.
   * @param inputElement - The input value.
   */
  copyClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.textContent = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.setSelectionRange(0, 0);
    textArea.blur();
    document.body.removeChild(textArea);
    this.snackBar.open('Copied To Clipboard', 'Close', {
      duration: 2000
    });
  }

  async ngOnInit() {
    const input: any = document.getElementById('search-client-input');

    // Init a timeout variable to be used below
    let timeout = null;
    const regex = /^[a-zA-Zא-ת]$/m;

    // Listen for keystroke events
    input.addEventListener('keyup', (e) => {
      // Clear the timeout if it has already been set.
      // This will prevent the previous task from executing
      // if it has been less than <MILLISECONDS>
      clearTimeout(timeout);
      if (regex.test(e.key) || e.key === 'Backspace' || e.key === 'Delete') {
        // Make a new timeout set to go off in 1000ms (1 second)
        timeout = setTimeout(() => {
          this.filterClients(this.clientsForSearch);
        }, 300);
      }
    });

    this.selectedSort = this.sortTypes[0].value;
    this.sortOrder.viewValue = this.sortOrderTypes.viewValue[this.sortOrder.selectedIndex];
    this.sortOrder.value = this.sortOrderTypes.value[this.sortOrder.selectedIndex];

    this.sharedService.onDataChange((data) => {
      this.teams = data;
    });

    if (PublicFunctions.getCookie('authorization') !== '') {
      this.user = PublicFunctions.DecodeJwt();
    } else {
      PublicFunctions.checkLogin();
    }

    if (!this.teams && this.user) {
      const data = await this.authService.getTeams(this.user.genesisId).toPromise();

      if (data && data.teams && data.teams.length > 0) {
        this.sharedService.setData = data.teams;
        this.teams = data.teams;

        for (const [teamIndex, team] of this.teams.entries()) {
          this.teams[teamIndex].isAdmin = false;

          for (const adminId of team.adminIds) {
            if (adminId === this.user.genesisId) {
              this.teams[teamIndex].isAdmin = true;
              break;
            }
          }
        }

        this.clients = await this.clientsService.getAllClients(this.selectedSort, this.sortOrder.value).toPromise();
      } else {
        this.router.navigateByUrl('/register');
      }
    } else {
      PublicFunctions.logout();
    }
  }

  ngAfterViewInit(): void {

    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 20)),
      throttleTime(1000)
    ).subscribe(() => {
      if (!this.filterClientMode) {
        this.ngZone.run(async () => {
          await this.fetchMoreClients();
        });
      }
    }
    );
  }

  /**
   * Opens modal to view scopes details of a specific client.
   * @param client - The client to view its scopes details.
   */
  openScopesDetails(client) {
    const dialogRef = this.dialogRef.open(ViewScopesModalComponent, {
      width: '700px',
      height: '730px',
      data: {
        scopes: client.scopes,
        clientName: client.name
      }
    });
  }

  async filterClients(dataToSearch) {
    if (dataToSearch && dataToSearch.length >= 2) {
      this.loadingChange = true;
      this.filterClientMode = true;
      this.resetPaginationDetails();

      try {
        this.clients = await this.clientsService.searchClientsView(dataToSearch).toPromise();
        this.loadingChange = false;
      } catch (err) {
        this.loadingChange = false;
      }
    } else {
      this.filterClientMode = false;
      this.reloadClientsData();
    }
  }

  async changeSortOrder() {
    this.sortOrder.selectedIndex = (this.sortOrder.selectedIndex * -1) + 1;
    this.sortOrder.viewValue = this.sortOrderTypes.viewValue[this.sortOrder.selectedIndex];
    this.sortOrder.value = this.sortOrderTypes.value[this.sortOrder.selectedIndex];
    await this.reloadClientsData();
  }

  async changeSortType() {
    await this.reloadClientsData();
  }

  async fetchMoreClients() {
    if (!this.noMoreToFetch) {
      this.loadingChange = true;
      console.log('fetching...');
      this.skip = this.clients.length;
      try {
        const newClients = await this.clientsService.getAllClients(this.selectedSort, this.sortOrder.value, this.skip, this.limit).toPromise();

        if (newClients.length > 0) {
          this.clients = this.clients.concat(newClients);
        }

        // If the chunk was less than the limit, no more clients will be found.
        if (newClients.length < this.limit) {
          this.noMoreToFetch = true;
        }

        this.loadingChange = false;

      } catch (err) {
        this.loadingChange = false;
      }

    } else {
      console.log('Not fetching!');
    }
  }

  resetPaginationDetails() {
    this.skip = 0;
    this.scroller.scrollToIndex(0);
    this.noMoreToFetch = false;
  }

  async reloadClientsData() {
    this.loadingChange = true;
    this.resetPaginationDetails();

    try {
      this.clients = await this.clientsService.getAllClients(this.selectedSort, this.sortOrder.value, this.skip, this.limit).toPromise();
      console.log(this.clients);
      this.loadingChange = false;
    } catch (err) {
      this.loadingChange = false;
    }
  }

  async openBottomSheet(id: string) {
    try {
      const contactPerson = await this.sharedService.getPerson(id).toPromise();

      if (contactPerson) {
        this.bottomSheet.open(BottomSheetContact, {
          data: { contactPerson }
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

}

/**
 * Bottom sheet component.
 */
@Component({
  selector: 'bottom-sheet',
  templateUrl: 'bottom-sheet.html',
  styleUrls: ['./bottom-sheet.css']
})
export class BottomSheetContact {
  contactPerson;

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetContact>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.contactPerson = data.contactPerson;
    console.log(this.contactPerson);
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}