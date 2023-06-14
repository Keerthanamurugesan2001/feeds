import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewfeedComponent } from './featured/newfeed/newfeed.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './featured/signin/signin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './material-module';
import { FieldDirective } from './shared/directives/field.directive';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './featured/home/home.component';
import { SettingsComponent } from './featured/settings/settings.component';
import { MatChipsModule} from '@angular/material/chips';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './featured/login/login.component';
import { SpinnerComponent } from './core/layout/spinner/spinner.component';
import { LoaderInterceptor } from './core/interceptor/loader.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppComponent,
    NewfeedComponent,
    HeaderComponent,
    FooterComponent,
    SigninComponent,
    FieldDirective,
    HomeComponent,
    SettingsComponent,
    LoginComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    NoopAnimationsModule,
    MatInputModule,
    MatChipsModule,
    HttpClientModule,
    MatIconModule,
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
