import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  usersEmailAddress: string;
  usersPassword: string;

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  async signUp() {
    const loading = await this.loadingController.create();
    await loading.present();
    if (
      (this.usersEmailAddress && this.usersPassword !== null) ||
      (this.usersEmailAddress && this.usersPassword !== '')
    ) {
      await this.authService
        .signUp(this.usersEmailAddress, this.usersPassword)
        .then((result) => {
          this.router.navigateByUrl('/login');
          loading.dismiss();
          this.presentToast();
        })
        .catch((error) => {
          console.log('major err -> ', error);
        });
    } else {
      loading.dismiss();
      this.showAlert('Signup Failed', 'Please try again!');
    }
    loading.dismiss();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'You\'re all signed up!',
      duration: 3500,
    });
    toast.present();
  }

  //ALERT CONTROLLER FOR LOOKS
  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
