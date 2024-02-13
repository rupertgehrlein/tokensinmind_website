import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LektionenKryptowaehrungenComponent } from './lektionen-kryptowaehrungen.component';

const routes: Routes = [
  {
    path: '',
    component: LektionenKryptowaehrungenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LektionenKryptowaehrungenRoutingModule { }
