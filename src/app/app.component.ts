import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, HostBinding, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoaderService } from './core/services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentChecked {
  
  currentTab: string = '';

  isLoading: Subject<boolean> = this.loaderService.loader;
  isNotLoading: Subject<boolean> = this.loaderService.not_loader;

  constructor(private router: Router, private loaderService: LoaderService) {}

  ngAfterContentChecked(): void {
    if(this.router.url.indexOf('home') != -1) this.currentTab = 'home';
    else if(this.router.url.indexOf('newfeed') != -1) this.currentTab = 'newfeed';
    else if(this.router.url.indexOf('settings') != -1) this.currentTab = 'settings';
    else if(this.router.url.indexOf('signin') != -1) this.currentTab = 'signin';
    else if(this.router.url.indexOf('login') != -1) this.currentTab = 'login';

  }

}
