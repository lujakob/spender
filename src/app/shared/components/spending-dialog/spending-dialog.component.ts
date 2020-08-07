import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Category } from '../../../interfaces/category.interface';
import { isNullOrUndefined } from 'util';
import { takeUntil } from 'rxjs/operators';
import { fieldValueToCents, sanitizeAmount } from '../../utils/amount.utils';

@Component({
  selector: 'app-spending-dialog',
  templateUrl: './spending-dialog.component.html',
  styleUrls: ['./spending-dialog.component.scss']
})
export class SpendingDialogComponent implements OnInit, OnDestroy {
  title = 'Add spending';
  categories$: BehaviorSubject<Category[]>;
  form = new FormGroup({
    amount: new FormControl(null, Validators.required),
    categoryId: new FormControl(null, Validators.required),
    createdAt: new FormControl(new Date(), Validators.required)
  });

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<SpendingDialogComponent>
  ) {
    this.categories$ = this.categoryService.categories$;
  }

  ngOnInit(): void {
    this.setData();
    this.form.get('amount').valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((val: string) => this.sanitizeFieldValue(val));
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

  /**
   * remove all chars except numbers and colon
   * truncate decimals to two
   */
  sanitizeFieldValue(val: string) {
    if (isNullOrUndefined(val)) {
      return;
    }

    this.form.get('amount').patchValue(sanitizeAmount(val), {emitEvent: false});
  }

  onSubmit() {
    const {amount, categoryId, createdAt} = this.form.getRawValue();
    const data = {
      amount: fieldValueToCents(amount),
      categoryId,
      createdAt,
    };
    this.dialogRef.close(data);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
