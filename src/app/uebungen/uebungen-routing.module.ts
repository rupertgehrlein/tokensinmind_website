import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UebungenHomeComponent } from './uebungen-home/uebungen-home.component';

const routes: Routes = [
  {
    path: '',
    component: UebungenHomeComponent
  },
  {
    path: 'kryptographie',
    loadChildren: () => import('./uebungen-kryptographie/uebungen-kryptographie.module').then(m => m.UebungenKryptographieModule)
  },
  {
    path: 'blockchain',
    loadChildren: () => import('./uebungen-blockchain/uebungen-blockchain.module').then(m => m.UebungenBlockchainModule)
  },
  {
    path: 'kryptowaehrungen',
    loadChildren: () => import('./uebungen-kryptowaehrungen/uebungen-kryptowaehrungen.module').then(m => m.UebungenKryptowaehrungenModule)
  },
  {
    path: 'nfts',
    loadChildren: () => import('./uebungen-nfts/uebungen-nfts.module').then(m => m.UebungenNftsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UebungenRoutingModule { }
