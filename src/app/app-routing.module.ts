import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuardFactory } from './auth.guard';
import { BeginnerQuizComponent } from './quizzes/beginner-quiz/beginner-quiz.component';
import { beginnerQuizGuardFactory } from './quizzes/guards/beginner-quiz.guard';
import { ProQuizComponent } from './quizzes/pro-quiz/pro-quiz.component';
import { proQuizGuardFactory } from './quizzes/guards/pro-quiz.guard';
import { ExpertQuizComponent } from './quizzes/expert-quiz/expert-quiz.component';
import { expertQuizGuardFactory } from './quizzes/guards/expert-quiz.guard';

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
    loadChildren: () => import('./uebungen/uebungen.module').then(m => m.UebungenModule),
    canActivate: [authGuardFactory]
  },
  {
    path: 'downloads',
    loadChildren: () => import('./downloads/downloads.module').then(m => m.DownloadsModule),
    canActivate: [authGuardFactory]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  { path: 'quizzes/beginner', component: BeginnerQuizComponent, canActivate: [beginnerQuizGuardFactory] },
  { path: 'quizzes/pro', component: ProQuizComponent, canActivate: [proQuizGuardFactory] },
  { path: 'quizzes/expert', component: ExpertQuizComponent, canActivate: [expertQuizGuardFactory] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
