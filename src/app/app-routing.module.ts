import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import  { AppComponent } from './app.component'
import  { CricketComponent } from '../app/cricket/cricket.component';
import { PrimeNumberComponent } from './prime-number/prime-number.component';

const routes: Routes = [
  { path: '', redirectTo: '/studentDetails', pathMatch: 'full' },
  {
    path: 'studentDetails',
    component: CricketComponent
  },
  {
    path: 'primeNumber',
    component: PrimeNumberComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
