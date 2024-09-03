import { NgModule } from '@angular/core';

import { LektionenRoutingModule } from './lektionen-routing.module';
import { LektionenHomeComponent } from './lektionen-home/lektionen-home.component';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    LektionenHomeComponent
  ],
  imports: [
    LektionenRoutingModule,
    CommonModule,
    DragDropModule
  ]
})
export class LektionenModule { }
