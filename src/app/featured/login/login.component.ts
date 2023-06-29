import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BasicUserDetails } from 'src/app/core/models/BasicUserDetails';
import { UserCredential, UserToken } from 'src/app/core/models/User';
import { FormFieldsInterface } from 'src/app/core/models/form';
import { UserService } from 'src/app/core/services/api/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public formFields: FormFieldsInterface[] = [];
  public formModel = {}
  public msgTitle = ""
  public msg = ""
  public show_error_msg = false

  constructor(private route: Router, private $user: UserService, private fb: FormBuilder) {
    this.formFields = [
      { label: 'Email', type: 'email', formControlName: 'email', icon: 'contacts' },
      { label: 'Password', type: 'password', formControlName: 'password', icon: 'visibility_off' },
      { label: 'Login', type: 'button', formControlName: '', icon: '' }
    ]
  }

  login(data: FormGroup): void {
    let userCredential: UserCredential = {
      email: data.value.email ?? '',
      password: data.value.password ?? '',
    }
    this.$user.user_login(userCredential).subscribe(
      (res: UserToken) => {
        if (res.message) {
          this.msgTitle = "Oops!"
          this.msg = "Invaid credential"
          this.show_error_msg = true
        }
        if (res.access_token) {
          this.$user.setToken(res.access_token)
          let userDetails: BasicUserDetails = {
            userId: res.user.userId? res.user.userId: 1,
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
  close_btn(): void {
    this.show_error_msg = false
  }

}
