import { Component, OnInit, Input, Output } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FirebaseAuthenticationService } from '../services/firebase-authentication.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @Input() userId: string;
  @Input() password: string;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private firebaseAuthService: FirebaseAuthenticationService
    ) { }

  ngOnInit() {
    this.password = '';
    this.userId = '';
  }


  public login(): void {
    if (this.userId && this.password) {
      this.firebaseAuthService.doLogin({email: this.userId, password: this.password})
      .then((resp) => {
        this.dismiss();
      },
      (err) => {
        this.authAlert(err.message);
      });
    } else {
      this.authAlert();
    }
  }

  public dismiss() {
    this.modalCtrl.dismiss({
      userId: this.userId,
      password: this.password
    });
  }

  private async authAlert(msg?: string) {
    const alert = await this.alertCtrl.create({
      header: 'Incorect credentials',
      message: msg ? msg : 'Please give something',
      buttons: ['Okay']
    });
    await alert.present();
  }
}
