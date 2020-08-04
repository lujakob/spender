import { Component, OnInit } from '@angular/core';
import { Category } from '../../interfaces/category.interface';

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
      id: 0,
      name: 'Lebensmittel',
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
