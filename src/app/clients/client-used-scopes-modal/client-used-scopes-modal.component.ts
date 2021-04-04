import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-client-used-scopes-modal',
  templateUrl: './client-used-scopes-modal.component.html',
  styleUrls: ['./client-used-scopes-modal.component.css']
})
export class ClientUsedScopesModalComponent implements OnInit {
  clients;
  clientName;

  constructor(public dialogRef: MatDialogRef<ClientUsedScopesModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.clients = data.clients;
    this.clientName = data.clientName;
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
