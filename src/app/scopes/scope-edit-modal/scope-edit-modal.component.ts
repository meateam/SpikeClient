import { Component, OnInit, Inject, ViewChild, NgZone } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { ScopesService } from '../scopes.service';

@Component({
  selector: 'app-scope-edit-modal',
  templateUrl: './scope-edit-modal.component.html',
  styleUrls: ['./scope-edit-modal.component.css']
})
export class ScopeEditModalComponent implements OnInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  scopeCopy;
  loadingChange = false;

  constructor(
    public dialogRef: MatDialogRef<ScopeEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _ngZone: NgZone,
    private scopeService: ScopesService
  ) {
    this.scopeCopy = { ...data.scope };
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit(): void {}

  async save(): Promise<void> {
    this.loadingChange = true;
    const updatedScope = await this.scopeService.updateScope(this.scopeCopy).toPromise();  
    this.loadingChange = false;
    this.dialogRef.close(updatedScope);
  }

  close(): void {
    this.dialogRef.close();
  }

}
