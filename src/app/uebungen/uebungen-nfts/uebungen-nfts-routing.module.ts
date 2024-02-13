import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UebungenNftsComponent } from './uebungen-nfts.component';

const routes: Routes = [
  {
    path: '',
    component: UebungenNftsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UebungenNftsRoutingModule { }
