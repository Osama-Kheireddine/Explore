import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-detailed-image',
  templateUrl: './detailed-image.page.html',
  styleUrls: ['./detailed-image.page.scss'],
})
export class DetailedImagePage implements OnInit {

  @Input() image: any;
  user = getAuth().currentUser.email;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    //code in here to get the image's details from firestore db
  }


  async dismissModal(){
    return await this.modalCtrl.dismiss();
  }
}
