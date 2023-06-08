import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewfeedComponent } from './featured/newfeed/newfeed.component';
import { HomeComponent } from './featured/home/home.component';
import { SigninComponent } from './featured/signin/signin.component';

const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch: 'full'},
  { path: 'newfeed', component: NewfeedComponent },
  {path: 'home', component: HomeComponent},
  {path:'signin', component: SigninComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
