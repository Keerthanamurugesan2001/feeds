import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './featured/home/home.component';
import { NewfeedComponent } from './featured/newfeed/newfeed.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './featured/signin/signin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './material-module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppComponent,
    NewfeedComponent,
    HeaderComponent,
    FooterComponent,
    SigninComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
