import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Layout } from './layout/layout';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Layout
  ],
  exports: [Layout]
})
export class SharedModule { }
