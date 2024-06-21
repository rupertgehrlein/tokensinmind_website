import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeginnerQuizComponent } from './beginner-quiz/beginner-quiz.component';
import { ProQuizComponent } from './pro-quiz/pro-quiz.component';
import { ExpertQuizComponent } from './expert-quiz/expert-quiz.component';

const routes: Routes = [
  { path: 'beginner', component: BeginnerQuizComponent },
  { path: 'pro', component: ProQuizComponent },
  { path: 'expert', component: ExpertQuizComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizzesRoutingModule { }
