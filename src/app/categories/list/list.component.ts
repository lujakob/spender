import { Component, OnInit } from '@angular/core';
import { Category } from '../../interfaces/category.interface';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from '../components/category-dialog/category-dialog.component';
import { ConfirmDialogData, ConfirmDialogService } from '../../shared/services/confirm-dialog.service';
import { CategoryService } from '../../shared/services/category.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  categories$: BehaviorSubject<Category[]>;

  constructor(
    public dialog: MatDialog,
    private confirm: ConfirmDialogService,
    private categoryService: CategoryService
  ) {
    this.categories$ = this.categoryService.categories$;
  }

  ngOnInit(): void {
  }

  onAdd() {
    this.dialog
      .open(CategoryDialogComponent, {restoreFocus: true})
      .afterClosed().subscribe((name: string) => {
        if (name) {
          this.categoryService.add({name});
        }
      });
  }

  onDelete(id: number) {
    const data = {
      message: 'Your really want to delete this category?',
      affirmButton: 'Delete',
      dismissButton: 'Cancel'
    } as ConfirmDialogData;

    this.confirm.open(data).affirm(() => {
      this.categoryService.delete(id);
    });
  }
}
