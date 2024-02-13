import { NgModule } from '@angular/core';

import { UebungenRoutingModule } from './uebungen-routing.module';
import { UebungenHomeComponent } from './uebungen-home/uebungen-home.component';


@NgModule({
  declarations: [
    UebungenHomeComponent
  ],
  imports: [
    UebungenRoutingModule
  ]
})
export class UebungenModule { }
