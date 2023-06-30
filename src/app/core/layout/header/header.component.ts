import { Component, Input } from '@angular/core';
import { ThemeServiceService } from '../../services/theme/theme-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public backgroundColor = '#4CAF50';
  public fontColor = 'white';
  @Input() currentTab: string = '';
  colors: any[] = [
    {value: 'green', viewValue: 'Green'},
    {value: 'red', viewValue: 'Red'},
    {value: 'yellow', viewValue: 'Yellow'},
    {value: 'black', viewValue: 'Black'},
  ];

  constructor(private themeService: ThemeServiceService) {}

  public colorChange(value: string){
    this.themeService.assignValue(value);
    if (value === 'red'){
      this.backgroundColor = 'rgb(162 10 10)';
      this.fontColor = 'white';
    }
    else if (value === 'green'){
      this.backgroundColor = '#4CAF50';
      this.fontColor = 'white';
    }
    else if (value === 'black'){
      this.backgroundColor = 'black';
      this.fontColor = 'white';
    }
    else if (value === 'yellow'){
      this.backgroundColor = '#bcbc15';
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