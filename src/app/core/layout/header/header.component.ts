import { Component, Input } from '@angular/core';
import { ThemeServiceService } from '../../services/theme/theme-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public backgroundColor = 'black';
  public fontColor = 'white';
  @Input() currentTab: string = '';
  colors: any[] = [
    {value: 'red_and_white', viewValue: 'Red & white'},
    {value: 'blue_and_green', viewValue: 'Blue & Green'},
    {value: 'black_and_white', viewValue: 'Black & White'}
  ];

  constructor(private themeService: ThemeServiceService) {}

  public colorChange(value: string){
    this.themeService.assignValue(value);
    if (value === 'red_and_white'){
      this.backgroundColor = 'white';
      this.fontColor = 'black';
    }
    else if (value === 'blue_and_green'){
      this.backgroundColor = '#5a5aff';
      this.fontColor = 'white';
    }
    else if (value === 'black_and_white'){
      this.backgroundColor = 'black';
      this.fontColor = 'white';
    }
  }

  public getStyle(){
    return {
      'background-color': this.backgroundColor,
      'color': this.fontColor
    }
  }
}