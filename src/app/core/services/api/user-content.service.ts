import { Injectable } from '@angular/core';
import { UserDetails } from '../../models/UserDetails';
import { HttpClient } from '@angular/common/http';

const baseURL: string = 'http://localhost:8080/api/backend';

@Injectable({
  providedIn: 'root'
})
export class UserContentService {

  constructor(private http: HttpClient) {}

  getUserContent(userId: number): UserDetails[] {
    let data: UserDetails[] = [];
    let dummy: UserDetails = {
      id: 0,
      title: '',
      body: '',
      user_id: 0,
      is_global: false,
      tag: '',
      created_at: new Date(),
      updated_at: new Date(),

    };
    this.http.get<UserDetails[]>(baseURL + '/content/' + userId).subscribe(
      (content) => data = content,
      (error) => data.push(dummy)
    );
    return data;
  }
}
