import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { LektionenHomeComponent } from './lektionen-home/lektionen-home.component';

const routes: Routes = [
  {
    path: '',
    component: LektionenHomeComponent
  },
  {
    path: 'kryptographie',
    loadChildren: () => import('./lektionen-kryptographie/lektionen-kryptographie.module').then(m => m.LektionenKryptographieModule)
  },
  {
    path: 'blockchain',
    loadChildren: () => import('./lektionen-blockchain/lektionen-blockchain.module').then(m => m.LektionenBlockchainModule)
  },
  {
    path: 'kryptowaehrungen',
    loadChildren: () => import('./lektionen-kryptowaehrungen/lektionen-kryptowaehrungen.module').then(m => m.LektionenKryptowaehrungenModule)
  },
  {
    path: 'nfts',
    loadChildren: () => import('./lektionen-nfts/lektionen-nfts.module').then(m => m.LektionenNftsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LektionenRoutingModule { }
