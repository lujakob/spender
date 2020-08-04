import { Component, OnInit } from '@angular/core';
import { Category } from '../../interfaces/category.interface';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from '../components/category-dialog/category-dialog.component';
import { ConfirmDialogData, ConfirmDialogService } from '../../shared/services/confirm-dialog.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  categories: Category[] = [
    {
      id: 0,
      name: 'Kaffeehaus',
    },
    {
      id: 1,
      name: 'Lebensmittel',
    }
  ];

  constructor(
    public dialog: MatDialog,
    private confirm: ConfirmDialogService
  ) { }

  ngOnInit(): void {
  }

  onAdd() {
    this.dialog
      .open(CategoryDialogComponent, {restoreFocus: true})
      .afterClosed().subscribe((name: string) => {
        console.log(`Dialog result: ${name}`);
        if (name) {
          this.categories.push({id: 2, name});
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
    });
  }
}
