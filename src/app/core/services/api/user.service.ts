import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, UserCredential, UserToken } from '../../models/User';
import { Observable } from 'rxjs';
import { BasicUserDetails } from '../../models/BasicUserDetails';
import { successMsg } from '../../models/SuccessAndErrorMsg';

const baseURL: string = 'https://f3d6-14-98-32-198.ngrok-free.app/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private ACCESS_TOKEN_KEY = 'jwtToken';
  private USER_DETAILS = 'userDetails';

  constructor(private http: HttpClient) { }

  getToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  setUserDetails(userDetails: BasicUserDetails) {
    localStorage.setItem(this.USER_DETAILS, JSON.stringify(userDetails));
  }

  getUserDetails(): BasicUserDetails | null {
    return JSON.parse(localStorage.getItem(this.USER_DETAILS) as string);
  }

  removeToken(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }

  create_user(details:User){
    return this.http.post<successMsg>('auth/register', details)
  }

  user_login(details:UserCredential): Observable<UserToken>{
    return this.http.post<UserToken>('auth/login', details)
  }
}
