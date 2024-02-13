import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UebungenBlockchainComponent } from './uebungen-blockchain.component';

const routes: Routes = [
  {
    path: '',
    component: UebungenBlockchainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UebungenBlockchainRoutingModule { }
