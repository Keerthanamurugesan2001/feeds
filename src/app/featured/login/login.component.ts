import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BasicUserDetails } from 'src/app/core/models/BasicUserDetails';
import { UserCredential } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/api/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private route: Router, private $user: UserService){}
  public msgTitle = ""
  public msg=""
  public userForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('',Validators.required), 
  });
  

  login(){
    let userCredential: UserCredential = {
      email: this.userForm.value.email ?? '',
      password: this.userForm.value.password ?? '',
    }
    this.$user.user_login(userCredential).subscribe(
      (res: any) => {
        if(res.message){
          this.msgTitle = "Oops!"
          this.msg = "Invaid credential"
        }
        if (res.access_token){
          this.$user.setToken(res.access_token)
          let userDetails: BasicUserDetails = {
            userId: res.user.userId,
            userName: res.user.userName,
            email: res.user.email,
          };
          this.$user.setUserDetails(userDetails);
          console.log('success');
          this.route.navigate(['/home'])
        }
        
      }
    )
   
  }
}
