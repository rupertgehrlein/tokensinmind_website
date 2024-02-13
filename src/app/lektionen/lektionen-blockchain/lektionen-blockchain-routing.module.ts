import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LektionenBlockchainComponent } from './lektionen-blockchain.component';

const routes: Routes = [
  {
    path: '',
    component: LektionenBlockchainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LektionenBlockchainRoutingModule { }
