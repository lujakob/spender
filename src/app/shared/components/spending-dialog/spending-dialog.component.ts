import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../../../interfaces/category.interface';

@Component({
  selector: 'app-spending-dialog',
  templateUrl: './spending-dialog.component.html',
  styleUrls: ['./spending-dialog.component.scss']
})
export class SpendingDialogComponent implements OnInit {
  title = 'Add spending';
  categories$: BehaviorSubject<Category[]>;
  form = new FormGroup({
    amount: new FormControl(null, Validators.required),
    categoryId: new FormControl(null, Validators.required),
    createdAt: new FormControl(new Date(), Validators.required)
  });

  constructor(
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<SpendingDialogComponent>
  ) {
    this.categories$ = this.categoryService.categories$;
  }

  ngOnInit(): void {
    this.setData();
  }

  setData() {
    if (!this.data) {
      return;
    }

    const {categoryId, categoryName} = this.data;
    if (categoryId) {
      this.form.get('categoryId').patchValue(categoryId);
    }

    if (categoryName) {
      this.title = `Add ${categoryName}`;
    }
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
