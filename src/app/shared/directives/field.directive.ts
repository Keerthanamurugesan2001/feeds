import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appField]'
})
export class FieldDirective {

  constructor(private ref: ElementRef) {}

  @Input() _isValid: boolean = false;

  set isValid(val: boolean) {
    this._isValid = val;
    if(val) {
      this.ref.nativeElement.style.border = '1 px solid green';
    }
  }

}
