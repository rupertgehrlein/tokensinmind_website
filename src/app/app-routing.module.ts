import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'lektionen',
    loadChildren: () => import('./lektionen/lektionen.module').then(m => m.LektionenModule)
  },
  {
    path: 'uebungen',
    loadChildren: () => import('./uebungen/uebungen.module').then(m => m.UebungenModule)
  },
  {
    path: 'downloads',
    loadChildren: () => import('./downloads/downloads.module').then(m => m.DownloadsModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m=>m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
