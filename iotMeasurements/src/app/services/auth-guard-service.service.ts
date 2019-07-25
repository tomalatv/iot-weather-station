import { Injectable } from '@angular/core';
import { FirebaseAuthenticationService } from './firebase-authentication.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {


  constructor(
    private firebaseAuth: FirebaseAuthenticationService,
    public router: Router
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.firebaseAuth.isAuthenticated()) {
      return true;
    } else {
       this.router.navigate(['home']);
       return false;
    }
  }

  public canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(route, state);
  }
}
