import { Injectable } from '@angular/core';
import { UserService } from '../api/user.service';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate{

  constructor(private authService:  UserService, private router: Router,
    private act: ActivatedRoute) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.getToken()) {
      return true;
    } else { 
      this.router.navigate(['login']);
      return false;
    }
  }

}
