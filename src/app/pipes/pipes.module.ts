import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterCompletePipe } from './filter-complete.pipe';



@NgModule({
  declarations: [
    FilterCompletePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilterCompletePipe
  ]
})
export class PipesModule { }
