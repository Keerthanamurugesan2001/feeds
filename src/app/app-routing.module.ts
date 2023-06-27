import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewfeedComponent } from './featured/newfeed/newfeed.component';
import { HomeComponent } from './featured/home/home.component';
import { SigninComponent } from './featured/signin/signin.component';
import { SettingsComponent } from './featured/settings/settings.component';
import { LoginComponent } from './featured/login/login.component';
import { AuthenticationService } from './core/services/auth/authentication.service';

const routes: Routes = [
  // { path: 'home', component: HomeComponent, canActivate: [AuthenticationService] },
  { path: 'home', component: HomeComponent},
  { path: 'newfeed', component: NewfeedComponent,  canActivate: [AuthenticationService] },
  { path:'signin', component: SigninComponent },
  {path: 'login', component: LoginComponent},
  { path: 'settings', component: SettingsComponent,  canActivate: [AuthenticationService] },
  { path: '', redirectTo: 'home', pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
