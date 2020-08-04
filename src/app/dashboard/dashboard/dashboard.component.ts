import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../interfaces/category.interface';
import { combineLatest, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { SpendingService } from '../../shared/services/spending.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Spending } from '../../interfaces/spending.interface';

const filterByRange = (params, spendings) => {
  console.log();
  const currentDate = !!params['period'] ? new Date(params['period']) : new Date();
  const startMom = moment(currentDate).startOf('month');
  const endMom = startMom.clone().add(1, 'month');
  return spendings.filter((s: Spending) => {
    return s.createdAt > startMom.toDate() && s.createdAt < endMom.toDate();
  });
};

export const sortByCategoryName = (res) => {
  res.sort((a, b) => {
    const nameB = a.categoryName.toUpperCase();
    const nameA = b.categoryName.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });
  return res;
};

export const sortByTotal = (res) => {
  res.sort((a, b) => {
    const nameB = a.total;
    const nameA = b.total;
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });
  return res;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  categories: Category[];
  res: any;
  resNoCats: any;

  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
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
      const res = this.categories.map((c: Category) => ({categoryId: c.id, categoryName: c.name, total: 0}));
      const resNoCats = {total: 0};

      byRange.forEach((s: Spending) => {
        const resIndex = res.findIndex(r => r.categoryId === s.categoryId);
        if (resIndex >= 0) {
          res[resIndex].total = res[resIndex].total + s.amount;
        } else {
          resNoCats.total = resNoCats.total + s.amount;
        }
      });
      this.res = sortByTotal(res);
      this.resNoCats = resNoCats;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
