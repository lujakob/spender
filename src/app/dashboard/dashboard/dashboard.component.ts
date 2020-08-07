import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../interfaces/category.interface';
import { combineLatest, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { SpendingService } from '../../shared/services/spending.service';
import { ActivatedRoute } from '@angular/router';
import { Spending } from '../../interfaces/spending.interface';
import { filterByRange, sortByTotal } from '../../utils/misc.utils';
import { SpendingDialogComponent } from '../../shared/components/spending-dialog/spending-dialog.component';
import { MatDialog } from '@angular/material/dialog';

interface CategoryData {
  categoryId?: number;
  categoryName?: string;
  total: number;
}

export const getTotal = arr => arr.reduce((acc, curr) => acc + curr.total, 0);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  categories: Category[];
  categoryData: CategoryData[];
  noCategoryData: CategoryData;
  totalThisMonth = 0;

  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private categoryService: CategoryService,
    private spendingService: SpendingService,
  ) { }

  ngOnInit(): void {
    this.categoryService.categories$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((categories: Category[]) => this.categories = categories);

    combineLatest([
      this.route.params,
      this.spendingService.spendings$.pipe(filter((s: Spending[]) => Array.isArray(s)))
    ]).pipe(
      map(([params, spendings]: [any, Spending[]]) => filterByRange(params, spendings))
    ).subscribe((byRange: Spending[]) => {
      const categoryData = this.categories.map((c: Category) => ({categoryId: c.id, categoryName: c.name, total: 0}));
      const noCategoryData = {total: 0};

      byRange.forEach((s: Spending) => {
        const resIndex = categoryData.findIndex(r => r.categoryId === s.categoryId);
        if (resIndex >= 0) {
          categoryData[resIndex].total = categoryData[resIndex].total + s.amount;
        } else {
          noCategoryData.total = noCategoryData.total + s.amount;
        }
      });

      this.categoryData = sortByTotal(categoryData);
      this.noCategoryData = noCategoryData;
      this.totalThisMonth = getTotal(this.categoryData) + this.noCategoryData.total;
    });
  }

  onAddSpending({categoryId, categoryName}: CategoryData) {
    this.dialog
      .open(SpendingDialogComponent, {restoreFocus: true, data: {categoryId, categoryName}})
      .afterClosed().subscribe((data: any) => {
      if (data) {
        this.spendingService.add(data);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
