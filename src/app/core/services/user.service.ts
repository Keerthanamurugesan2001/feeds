import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  public user = {
    username: 'keerthu',
    email: 'keerthuofficial2001@gmail.com',
    password: 'keerthu2001',
    created_at: '2022-01-09',
    updated_at: '2022-01-09',
  }
}
