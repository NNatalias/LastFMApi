import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomePageComponent} from './home-page/home-page.component';
import {SearchPageComponent} from './search-page/search-page.component';
import {RouterModule, Routes} from '@angular/router';
import {ErPageComponent} from './er-page/er-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'search', component: SearchPageComponent},
  { path: '**', component: ErPageComponent}
  ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, [RouterModule.forRoot(routes)],
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
