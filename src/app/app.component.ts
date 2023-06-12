import { AfterContentChecked, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentChecked {
  
  currentTab: string = '';

  constructor(private router: Router) {}

  ngAfterContentChecked(): void {
    if(this.router.url.indexOf('home') != -1) this.currentTab = 'home';
    else if(this.router.url.indexOf('newfeed') != -1) this.currentTab = 'newfeed';
    else if(this.router.url.indexOf('settings') != -1) this.currentTab = 'settings';
    else if(this.router.url.indexOf('signin') != -1) this.currentTab = 'signin';
  }

}
