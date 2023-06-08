import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewfeedComponent } from './featured/newfeed/newfeed.component';
import { HomeComponent } from './featured/home/home.component';
import { SigninComponent } from './featured/signin/signin.component';
import { SettingsComponent } from './featured/settings/settings.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'newfeed', component: NewfeedComponent },
  { path:'signin', component: SigninComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: 'newfeed', pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
