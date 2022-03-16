import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  usersEmailAddress: string;
  usersPassword: string;

  constructor(private authService: AuthService) { }

  async signUp(){
    await this.authService.signUp(this.usersEmailAddress, this.usersPassword).then((result) =>{
      console.log('signing up: ');
      //redirect to the login page
    }).catch((error) => {
      console.log('An error occurred whilst signing up: ', error);
    });
  }
}
