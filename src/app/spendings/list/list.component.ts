import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Spending } from '../../interfaces/spending.interface';
import { ConfirmDialogData, ConfirmDialogService } from '../../shared/services/confirm-dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { SpendingService } from '../../shared/services/spending.service';
import { SpendingDialogComponent } from '../../shared/components/spending-dialog/spending-dialog.component';
import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../interfaces/category.interface';
import { filter, map } from 'rxjs/operators';
import { mapCategory, sortByDateDesc } from '../../utils/misc.utils';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  spendings$: Observable<Spending[]>;

  constructor(
    public dialog: MatDialog,
    private confirm: ConfirmDialogService,
    private spendingService: SpendingService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.spendings$ = combineLatest([
      this.spendingService.spendings$,
      this.categoryService.categories$
    ]).pipe(
      filter(([spendings, categories]) => !!spendings && !!categories),
      map(([spendings, categories]: [Spending[], Category[]]) => mapCategory(spendings, categories)),
      map((spendings: Spending[]) => sortByDateDesc(spendings))
    );
  }

  onAdd() {
    this.dialog
      .open(SpendingDialogComponent, {restoreFocus: true})
      .afterClosed().subscribe((data: any) => {
      if (data) {
        this.spendingService.add(data);
      }
    });
  }

  onDelete(id: number) {
    const data = {
      message: 'Your really want to delete this spending?',
      affirmButton: 'Delete',
      dismissButton: 'Cancel'
    } as ConfirmDialogData;

    this.confirm.open(data).affirm(() => {
      this.spendingService.delete(id);
    });
  }
}
