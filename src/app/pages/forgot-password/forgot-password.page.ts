import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  email: string;
  constructor(
    private auth: AuthService,
    private loading: LoadingController,
    private alert: AlertController
  ) {}

  ngOnInit() {}

  async forgotPassword() {
    const loading = await this.loading.create();
    await loading.present();
    if (this.email !== '') {
      this.auth.forgotPassword(this.email);
      this.email = '';
    }
    await loading.dismiss();
  }

  async showAlert(header, message) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
