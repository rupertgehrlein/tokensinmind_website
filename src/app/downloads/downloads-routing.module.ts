import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadsHomeComponent } from './downloads-home/downloads-home.component';

const routes: Routes = [
  {
    path: '',
    component: DownloadsHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadsRoutingModule { }
