import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeginnerQuizComponent } from './beginner-quiz/beginner-quiz.component';
import { ProQuizComponent } from './pro-quiz/pro-quiz.component';
import { ExpertQuizComponent } from './expert-quiz/expert-quiz.component';
import { beginnerQuizGuardFactory } from './guards/beginner-quiz.guard';
import { proQuizGuardFactory } from './guards/pro-quiz.guard';
import { expertQuizGuardFactory } from './guards/expert-quiz.guard';

const routes: Routes = [
  { path: 'beginner', component: BeginnerQuizComponent, canActivate: [beginnerQuizGuardFactory] },
  { path: 'pro', component: ProQuizComponent, canActivate: [proQuizGuardFactory] },
  { path: 'expert', component: ExpertQuizComponent, canActivate: [expertQuizGuardFactory] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizzesRoutingModule { }
