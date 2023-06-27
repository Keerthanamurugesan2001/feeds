import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeServiceService {
  // public selectedTheme: string = 'green_and_black';
  constructor() { }

  private selectedTheme: BehaviorSubject<string> = new BehaviorSubject<string>('initial value');
  public selectedColor$ = this.selectedTheme.asObservable();

  public setVariable(value: string): void {
    this.selectedTheme.next(value);
  }

  public assignValue(newValue: string): void {
    this.selectedTheme.next(newValue);
  }
}
