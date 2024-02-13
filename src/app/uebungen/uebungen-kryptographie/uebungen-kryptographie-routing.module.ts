import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UebungenKryptographieComponent } from './uebungen-kryptographie.component';

const routes: Routes = [
  {
    path: '',
    component: UebungenKryptographieComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UebungenKryptographieRoutingModule { }
