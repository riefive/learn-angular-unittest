import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuotesComponent } from './quotes/quotes.component';

const AppRoute: Routes = [
  { path: '', component: QuotesComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(AppRoute)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
