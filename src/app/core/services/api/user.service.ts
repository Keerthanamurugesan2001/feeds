import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, UserCredential, UserToken } from '../../models/User';
import { Observable } from 'rxjs';

const baseURL: string = 'https://8de4-14-98-32-198.ngrok-free.app/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private ACCESS_TOKEN_KEY = 'jwtToken';

  constructor(private http: HttpClient) { }

  getToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }

  create_user(details:User){
    return this.http.post(baseURL + 'auth/register', details)
  }

  user_login(details:UserCredential): Observable<UserToken>{
    return this.http.post<UserToken>(baseURL + 'auth/login', details)
  }
}
