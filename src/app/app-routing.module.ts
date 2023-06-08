import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewfeedComponent } from './featured/newfeed/newfeed.component';
import { HomeComponent } from './featured/home/home.component';

const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch: 'full'},
  { path: 'newfeed', component: NewfeedComponent },
  {path: 'home', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
