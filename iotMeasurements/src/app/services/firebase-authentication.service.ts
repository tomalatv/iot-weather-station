import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthenticationService {

  constructor(private afAuth: AngularFireAuth) {
      this.initAuthStateChanged();
  }

  public initAuthStateChanged() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

    public doLogin(value): Promise<any> {
      return new Promise<any>((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(value.email, value.password).then(
            res => {
              resolve(res);
            },
            err => {
              reject(err);
            }
        );
      });
    }

  public logOut(): Promise<void> {
    return new Promise<void> ((resolve, reject) => {
      firebase.auth().signOut().then(
        () => {
          localStorage.removeItem('user');
          resolve();
        }
      ).catch((err) => {
        console.log('Error on login out user: ', err);
      });
    });
  }

  public isAuthenticated(): boolean {
    return JSON.parse(localStorage.getItem('user')) !== null;
  }

}
