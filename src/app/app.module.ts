import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FrameComponent } from './components/frame/frame.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path: '',
    component: FrameComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
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
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
