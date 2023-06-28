import { Component } from '@angular/core';
import { ThemeServiceService } from '../../services/theme/theme-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public backgroundColor: string = '#4CAF50';
  public fontColor: string = '#FFFFFF';

  constructor(private themeService: ThemeServiceService) {}

  ngOnInit(){
    this.themeService.selectedColor$.subscribe((value) => {
      this.getColor(value);
    })
  }

  public getColor(value: string){
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
}
