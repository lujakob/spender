import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
  ]
})
export class SharedModule { }
