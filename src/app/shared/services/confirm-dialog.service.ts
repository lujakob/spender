import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

export class ConfirmDialogData {
  message: string;
  dismissButton: string;
  affirmButton: string;
}

@Injectable()
export class ConfirmDialogService {
  dialogRef: MatDialogRef<any>;

  constructor(public dialog: MatDialog) { }

  affirm(callback): ConfirmDialogService {
    this.dialogRef.afterClosed().subscribe(result => {
      if (result === 'affirm') {
        callback();
      }
    });
    return this;
  }

  dismiss(callback): ConfirmDialogService {
    this.dialogRef.afterClosed().subscribe(result => {
      if (result === 'dismiss') {
        callback();
      }
    });
    return this;
  }

  afterClosed(callback): ConfirmDialogService {
    this.dialogRef.afterClosed().subscribe(result => {
      callback();
    });
    return this;
  }

  open(data: ConfirmDialogData, config: MatDialogConfig = {}): ConfirmDialogService {
    config.data = data;
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, config);
    return this;
  }
}
