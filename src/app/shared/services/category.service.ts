import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Category } from '../../interfaces/category.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>(null);
  private readonly storeName = 'category';

  constructor(private dbService: NgxIndexedDBService) {
    this.getAll();
  }

  getAll() {
    this.dbService.getAll(this.storeName).then(
      (categories: Category[]) => this.categories$.next(categories),
      error => console.log('Could not fetch categories:', error)
    );
  }

  add(data) {
    this.dbService.add(this.storeName, data).then(
      () => this.getAll(),
      error => console.log('Could not add category:', error)
    );
  }

  delete(id: number) {
    this.dbService.delete(this.storeName, id).then(
      () => this.getAll(),
      error => console.log('Could not delete', error)
    );
  }
}
