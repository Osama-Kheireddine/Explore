import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  photoPath: any;
  constructor(private authService: AuthService, private router: Router, private photoService: PhotoService) { }

  ngOnInit() {

  }

  async signOut(){
    await this.authService.signOut().then(()=>{
      if(getAuth().currentUser === null){
        //redirect to home
        this.router.navigateByUrl('/login');
      }
    }).catch((err)=>{
      console.log('an error has occurred signing out', err);

    });
  }

}
