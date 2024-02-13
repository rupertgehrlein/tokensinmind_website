import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LektionenKryptographieComponent } from './lektionen-kryptographie.component';

const routes: Routes = [
  {
    path: '',
    component: LektionenKryptographieComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LektionenKryptographieRoutingModule { }
