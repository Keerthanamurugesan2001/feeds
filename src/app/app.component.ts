import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, HostBinding, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoaderService } from './core/services/loader/loader.service';
import { ThemeServiceService } from './core/services/theme/theme-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentChecked {
  
  currentTab: string = '';
  backgroundColor: string = '';
  fontColor: string = '';

  constructor(private router: Router, private loaderService: LoaderService, private themeService: ThemeServiceService) {}
  
  ngOnInit(){
    this.themeService.selectedColor$.subscribe((value: string) => {
      this.getColor(value);
    });
  }

  ngAfterContentChecked(): void {
    if(this.router.url.indexOf('home') != -1) this.currentTab = 'home';
    else if(this.router.url.indexOf('newfeed') != -1) this.currentTab = 'newfeed';
    else if(this.router.url.indexOf('settings') != -1) this.currentTab = 'settings';
    else if(this.router.url.indexOf('signin') != -1) this.currentTab = 'signin';
    else if(this.router.url.indexOf('login') != -1) this.currentTab = 'login';

  }

  private getColor(value: any){
    console.log('hey', value)
    if (value === 'red'){
      this.backgroundColor = 'rgb(240, 114, 114)';
      this.fontColor = 'white';
    }
    else if (value === 'green'){
      this.backgroundColor = 'rgb(162, 245, 137)';
      this.fontColor = 'white';
    }
    else if (value === 'yellow'){
      this.backgroundColor = 'rgb(237, 240, 103)';
      this.fontColor = 'white';
    }
    else if (value === 'black'){
      this.backgroundColor = 'rgb(51, 51, 51)';
      this.fontColor = 'white';
    }
  }
}
