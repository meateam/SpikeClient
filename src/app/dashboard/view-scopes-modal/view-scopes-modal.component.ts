import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-scopes-modal',
  templateUrl: './view-scopes-modal.component.html',
  styleUrls: ['./view-scopes-modal.component.css']
})
export class ViewScopesModalComponent implements OnInit {
  scopes;
  clientName;

  constructor(public dialogRef: MatDialogRef<ViewScopesModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
         this.scopes = data.scopes;
         this.clientName = data.clientName;
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
