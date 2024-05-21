import { NgModule } from '@angular/core';

import { LektionenRoutingModule } from './lektionen-routing.module';
import { LektionenHomeComponent } from './lektionen-home/lektionen-home.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    LektionenHomeComponent
  ],
  imports: [
    LektionenRoutingModule,
    CommonModule
  ]
})
export class LektionenModule { }
