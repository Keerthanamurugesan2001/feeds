import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  constructor(private route: Router){}
  public userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('',Validators.required), 
  });
  checkUser(){
    this.route.navigate(['/home'])
  }
  signIn(){
    this.route.navigate(['/home'])
  }
}
