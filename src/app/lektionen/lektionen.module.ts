import { NgModule } from '@angular/core';

import { LektionenRoutingModule } from './lektionen-routing.module';
import { LektionenHomeComponent } from './lektionen-home/lektionen-home.component';



@NgModule({
  declarations: [
    LektionenHomeComponent
  ],
  imports: [
    LektionenRoutingModule
  ]
})
export class LektionenModule { }
