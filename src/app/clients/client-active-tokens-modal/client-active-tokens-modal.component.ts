import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-client-active-tokens-modal',
  templateUrl: './client-active-tokens-modal.component.html',
  styleUrls: ['./client-active-tokens-modal.component.css']
})
export class ClientActiveTokensModalComponent implements OnInit {
  tokenList;
  client;

  constructor(
    public dialogRef: MatDialogRef<ClientActiveTokensModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.tokenList = data.tokenList.sort((a, b) => b.count - a.count);
      this.client = data.client;
    }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(false);
  }
}
