import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormFieldsInterface } from 'src/app/core/models/form';
import { PasswordStrengthValidator } from 'src/app/core/validator/password.validators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() formModel: FormFieldsInterface[] = [];
  @Output() dataEvent = new EventEmitter();
  public dynamicFormGroup: FormGroup;
  public isVisbile = false

  constructor(private fb: FormBuilder){

    this.dynamicFormGroup = this.fb.group({});
    
  } 
  ngOnInit(): void{
    let formControls: any = {}
    for (const field of this.formModel){
      if (field.type == 'password'){
        formControls[field.formControlName] = new FormControl('', Validators.compose([
          Validators.required, Validators.minLength(8), PasswordStrengthValidator]))
      }
      else if (field.type == 'email'){
        formControls[field.formControlName] = new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }
      else if (field.type != 'button'){
        formControls[field.formControlName] = new FormControl('', Validators.required)
      }      
    }
    this.dynamicFormGroup = this.fb.group(formControls)
  }

  save(): void{
    if (this.dynamicFormGroup.invalid) {
      return;
    }
    this.dataEvent.emit(this.dynamicFormGroup);
  }
  
  toggle_visiblity(): void{
    this.isVisbile = !this.isVisbile
  }
}
