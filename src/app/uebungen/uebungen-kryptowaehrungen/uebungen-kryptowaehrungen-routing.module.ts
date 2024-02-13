import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UebungenKryptowaehrungenComponent } from './uebungen-kryptowaehrungen.component';

const routes: Routes = [
  {
    path: '',
    component: UebungenKryptowaehrungenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UebungenKryptowaehrungenRoutingModule { }
