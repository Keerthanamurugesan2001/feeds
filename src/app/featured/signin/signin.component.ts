import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  public userForm = new FormGroup({
    username: new FormControl('keerthu'),
    email: new FormControl(''),
    password: new FormControl(), 
  });
  checkUser(){
    
  }
}
