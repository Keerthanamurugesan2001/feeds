import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() currentTab: string = '';
  colors: any[] = [
    {value: 'steak-0', viewValue: 'Red & white'},
    {value: 'pizza-1', viewValue: 'Blue & Green'},
    {value: 'tacos-2', viewValue: 'Black & White'},
  ];

}