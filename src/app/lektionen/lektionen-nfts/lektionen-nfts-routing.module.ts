import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LektionenNftsComponent } from './lektionen-nfts.component';

const routes: Routes = [
  {
    path: '',
    component: LektionenNftsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LektionenNftsRoutingModule { }
