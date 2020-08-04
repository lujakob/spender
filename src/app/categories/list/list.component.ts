import { Component, OnInit } from '@angular/core';
import { Category } from '../../interfaces/category.interface';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from '../components/category-dialog/category-dialog.component';
import { ConfirmDialogData, ConfirmDialogService } from '../../shared/services/confirm-dialog.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  categories: Category[];

  constructor(
    public dialog: MatDialog,
    private confirm: ConfirmDialogService,
    private dbService: NgxIndexedDBService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.dbService.getAll('categories').then(
      (categories: Category[]) => {
        console.log(categories);
        this.categories = categories;
      },
      error => {
        console.log('Could not fetch categories:', error);
      }
    );
  }

  onAdd() {
    this.dialog
      .open(CategoryDialogComponent, {restoreFocus: true})
      .afterClosed().subscribe((name: string) => {
        console.log(`Dialog result: ${name}`);
        if (name) {
          this.dbService.add('categories', { name }).then(
            () => this.getAll(),
            error => console.log(error)
          );
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
      console.log("delete", id);
      this.dbService.delete('categories', id).then(
        () => this.getAll(),
        error => console.log('Could not delete', error)
      );
    });
  }
}
