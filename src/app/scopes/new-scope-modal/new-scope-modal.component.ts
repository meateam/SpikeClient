// new-scope-modal.component

import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-new-scope-modal',
  templateUrl: './new-scope-modal.component.html',
  styleUrls: ['./new-scope-modal.component.css']
})
export class NewScopeModalComponent implements OnInit {
  @ViewChild('inputSelected') input: MatInput;
  
  /**
   * Constructor of the component.
   * @param formBuilder - The builder of the form
   * @param dialogRef - The reference for the dialog
   * @param data - The data given to the modal
   */
  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<NewScopeModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.user = data.user;
                this.clients = data.clients;
              }

  scopeNameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9]{3,30}$'),
  ]);

  descFormControl = new FormControl('', [
  ]);

  clientFormControl = new FormControl('', [
    Validators.required,
  ]);

  user;
  clients;
  team;
  selectedClientId;
  scopeFormGroup: FormGroup;
  teamName: string;
  desc: string;
  errorMsg: string;
  privateActive: string = 'active-class';
  publicActive: string = 'inactive-class'; 
  selectedClient = {name: {}};

  ngOnInit(): void {
    setTimeout(() => { this.input.focus(); }, 250);
    this.scopeFormGroup = this.formBuilder.group({
      scopeName: this.scopeNameFormControl,
      desc: this.descFormControl,
      client: this.clientFormControl,
    });
  }

  close() {
    this.dialogRef.close(false);
  }

  changeActive() {
    if (this.privateActive === 'active-class') {
      this.privateActive = 'inactive-class';
      this.publicActive = 'active-class';
    } else {
      this.publicActive = 'inactive-class';
      this.privateActive = 'active-class';
    }
  }

  /**
   * Selects the client.
   * @param clientId - The clientId of the selected Client.
   */
  selectClient(clientId) {
    this.selectedClientId = clientId;

    for (const currClient of this.clients) {
      if (currClient.clientId === clientId) {
        this.selectedClient = currClient;
      }
    }
  }

  /**
   * Checks whether there is any error in any input
   */
  isDetailsValid() {
    return this.scopeFormGroup.status !== 'INVALID';
  }

  /**
   * Add scope with dialog.
   */
  addScope() {
    this.dialogRef.close({
      value: this.scopeFormGroup.value.scopeName,
      type: this.privateActive === 'active-class' ? 'PRIVATE' : 'PUBLIC',
      client: {name: this.scopeFormGroup.value.client.name, clientId: this.scopeFormGroup.value.client.clientId},
      audienceId: this.scopeFormGroup.value.client.audienceId,
      creator: this.user.fullName || `${this.user.name.firstName} ${this.user.name.lastName}`,
      description: this.scopeFormGroup.value.desc,
      permittedClients: []
    })
  }
}
