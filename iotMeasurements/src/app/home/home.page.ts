import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
// import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseAuthenticationService } from '../services/firebase-authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private loginModal: ModalController,
    private firebaseAuth: FirebaseAuthenticationService
    ) {}

  public ngOnInit(): void {
    if (!this.firebaseAuth.isAuthenticated()) {
      this.openModal();
    }
  }

  public async openModal(): Promise<void> {
    const modal = await this.loginModal.create(
      {
        component: LoginPage,
        backdropDismiss: false,
        showBackdrop: true
      }
    );

    await modal.present();
    const {data} =  await modal.onDidDismiss();
    if ( data.userId === '' || data.password === '') {
      this.openModal();
    }
  }

  public async logOut(): Promise<void> {
    this.firebaseAuth.logOut();
  }
}
