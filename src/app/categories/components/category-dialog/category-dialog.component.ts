import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {

  name = new FormControl(null, Validators.required);

  constructor(public dialogRef: MatDialogRef<CategoryDialogComponent>) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.dialogRef.close(this.name.value);
  }
}
