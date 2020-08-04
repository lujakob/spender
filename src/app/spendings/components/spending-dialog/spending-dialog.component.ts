import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../shared/services/category.service';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../../../interfaces/category.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-spending-dialog',
  templateUrl: './spending-dialog.component.html',
  styleUrls: ['./spending-dialog.component.scss']
})
export class SpendingDialogComponent implements OnInit {
  categories$: BehaviorSubject<Category[]>;
  form = new FormGroup({
    amount: new FormControl(null, Validators.required),
    categoryId: new FormControl(null, Validators.required),
    createdAt: new FormControl(new Date(), Validators.required)
  });

  constructor(
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<SpendingDialogComponent>
  ) {
    this.categories$ = this.categoryService.categories$;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const {amount, categoryId, createdAt} = this.form.getRawValue();
    const data = {
      amount: +amount,
      categoryId,
      createdAt,
    };
    this.dialogRef.close(data);
  }
}
