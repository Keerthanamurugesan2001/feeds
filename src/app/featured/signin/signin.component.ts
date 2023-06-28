import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/api/user.service';
import { User, UserCredential } from 'src/app/core/models/User';
import { FormFieldsInterface } from 'src/app/core/models/form';
import { successMsg } from 'src/app/core/models/SuccessAndErrorMsg';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  public formFields: FormFieldsInterface[] = [];
  public formModel = {}
  public msgTitle = ""
  public msg = ""
  public show_error_msg = false
  
  constructor(private route: Router, private $user: UserService){
    this.formFields = [
      {label: 'Username', type: 'username', formControlName: 'username', icon: 'contacts'},
      {label: 'Email', type: 'email', formControlName: 'email', icon: 'mail'},
      {label: 'Password', type: 'password', formControlName: 'password', icon: 'visibility_off'},
      {label: 'Signin', type: 'button', formControlName: '', icon:''}
    ]
  }

  signIn(data: FormGroup): void{
    let userDetail: User= {
      userName: data.value.username ?? '',
      email: data.value.email ?? '',
      password: data.value.password ?? '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    this.$user.create_user(userDetail).subscribe(
      (res: successMsg) => {
        if(res.statusCode == 201){
          this.route.navigate(['/login'])
        }             
      },
      (err:any)=>{
        let statuscode = err.status
        this.msgTitle = "Oops!"
        if (statuscode == 400) {
          this.msg = "Invaid request"
          this.show_error_msg = true
        }
        else if(statuscode == 409){
          this.msg = err.error.message
          this.show_error_msg = true
        }
      }
    )
  }
  close_btn(): void {
    this.show_error_msg = false
  }
}
