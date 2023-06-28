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
    {value: 'red', viewValue: 'Red'},
    {value: 'blue', viewValue: 'Blue'},
    {value: 'black', viewValue: 'Black'}
  ];

  constructor(private themeService: ThemeServiceService) {}

  public colorChange(value: string){
    console.log(value)
    this.themeService.assignValue(value);
    if (value === 'red'){
      this.backgroundColor = 'rgb(162 10 10)';
      this.fontColor = 'white';
    }
    else if (value === 'blue'){
      this.backgroundColor = '#5a5aff';
      this.fontColor = 'white';
    }
    else if (value === 'black'){
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