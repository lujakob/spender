import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Spending } from '../../interfaces/spending.interface';

@Injectable({
  providedIn: 'root'
})
export class SpendingService {
  spendings$: BehaviorSubject<Spending[]> = new BehaviorSubject<Spending[]>(null);

  private readonly storeName = 'spending';

  constructor(private dbService: NgxIndexedDBService) {
    this.getAll();
  }

  getAll() {
    this.dbService.getAll(this.storeName).then(
      (spendings: Spending[]) => {
        this.spendings$.next(spendings);
      },
      error => console.log('Could not fetch spendings:', error)
    );
  }

  add(data) {
    this.dbService.add(this.storeName, data).then(
      () => this.getAll(),
      error => console.log('Could not add spending:', error)
    );
  }

  delete(id: number) {
    this.dbService.delete(this.storeName, id).then(
      () => this.getAll(),
      error => console.log('Could not delete', error)
    );
  }
}
