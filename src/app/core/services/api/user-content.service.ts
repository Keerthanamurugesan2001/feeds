import { Injectable } from '@angular/core';
import { UserDetails } from '../../models/UserDetails';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseURL: string = 'https://8de4-14-98-32-198.ngrok-free.app/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class UserContentService {

  constructor(private http: HttpClient) {}

  getUserContent(): Observable<UserDetails[]> {
    return this.http.get<UserDetails[]>(baseURL + 'post/all')
  }


  postUserContent(details: UserDetails): Observable<UserDetails> {
    return this.http.post<UserDetails>(baseURL + 'post', details);
  }

}
