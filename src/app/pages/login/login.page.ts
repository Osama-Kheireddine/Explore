import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { getAuth } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  auth = getAuth();
  usersEmail: string;
  usersPassword: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    if (getAuth().currentUser !== null) {
      //redirect to home
      this.router.navigateByUrl('/home');
    }
  }

  async signIn() {
    const loading = await this.loadingController.create();
    await loading.present();

    await this.authService
      .signIn(this.usersEmail, this.usersPassword)
      .then(() => {
        if (getAuth().currentUser !== null) {
          //redirect to home
          this.router.navigateByUrl('/home');
          this.presentToast();
        }else {
          this.showAlert('Login Failed','Please try again!');
        }
      }); //sign in the user
      await loading.dismiss();
  }

  async googleAuthLogIn() {
    const loading = await this.loadingController.create();
    await loading.present();
    await this.authService
      .googleSignInWithPopUp()
      .then(() => {
        if (getAuth().currentUser !== null) {
          //redirect to home
          this.router.navigateByUrl('/home');
          this.presentToast();
        }else {
          this.showAlert('Login Failed','Please try again!');
        }
      })
      .catch(() => {
        console.log('err');
      }); //sign in through google with popup
      await loading.dismiss();
  }

  async signOut() {
    await this.authService.signOut(); //sign the user out
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Successful login',
      duration: 1000
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
