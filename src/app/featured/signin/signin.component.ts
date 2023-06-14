import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/api/user.service';
import { User, UserCredential } from 'src/app/core/models/User';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  constructor(private route: Router, private $user: UserService){}
  public userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',Validators.required), 
  });
  

  signIn(): void{
    let userDetail: User= {
      userName: this.userForm.value.username ?? '',
      email: this.userForm.value.email ?? '',
      password: this.userForm.value.password ?? '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    this.$user.create_user(userDetail).subscribe(
      (res) => {
            this.route.navigate(['/login'])        
      }
      
    )
    
  }
}
