import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FrameComponent } from './components/frame/frame.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { MatIconModule } from '@angular/material/icon';

const dbConfig: DBConfig  = {
  name: 'spender',
  version: 1,
  objectStoresMeta: [
    {
      store: 'category',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } }
      ]
    },
    {
      store: 'spending',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'amount', keypath: 'amount', options: { unique: false } },
        { name: 'category', keypath: 'category', options: { unique: false } },
        { name: 'date', keypath: 'date', options: { unique: false } },
      ]
    }
  ]
};

const routes: Routes = [
  {
    path: '',
    component: FrameComponent,
    children: [
      // {
      //   path: '',
      //   loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      // },
      {
        path: '',
        redirectTo: 'spendings',
        pathMatch: 'full'
      },
      {
        path: 'spendings',
        loadChildren: () => import('./spendings/spendings.module').then(m => m.SpendingsModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];


@NgModule({
  declarations: [
    AppComponent,
    FrameComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    NgxIndexedDBModule.forRoot(dbConfig),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
