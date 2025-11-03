import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material-module/material-module-module';
import { Layout } from './layout/layout';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    Layout
  ],
  exports: [Layout]
})
export class SharedModule { }
