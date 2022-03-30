import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabasePhotoRef, PhotoService } from 'src/app/services/photo.service';
import { DetailedImagePage } from '../detailed-image/detailed-image.page';

@Component({
  selector: 'app-user-photos',
  templateUrl: './user-photos.page.html',
  styleUrls: ['./user-photos.page.scss'],
})
export class UserPhotosPage implements OnInit {
  images = [
    {
      // eslint-disable-next-line max-len
      path: 'https://firebasestorage.googleapis.com/v0/b/explore-users.appspot.com/o/uploads%2Fd00225138%2F8c9e3b9a-dd77-4f7c-ba0f-59567c19c09f.png?alt=media&token=977044a4-01d8-41a3-8cfa-a0678ed7aaa9'
    },
    {
      // eslint-disable-next-line max-len
      path: 'https://firebasestorage.googleapis.com/v0/b/explore-users.appspot.com/o/uploads%2Fd00225138%2F0a745ae9-8f73-4803-95f0-f6951793ab80.png?alt=media&token=fc445305-54db-4444-b72d-53a0f723a2fb'
    },{
      // eslint-disable-next-line max-len
      path: 'https://firebasestorage.googleapis.com/v0/b/explore-users.appspot.com/o/uploads%2Fd00225138%2F8c9e3b9a-dd77-4f7c-ba0f-59567c19c09f.png?alt=media&token=977044a4-01d8-41a3-8cfa-a0678ed7aaa9'
    },
    {
      // eslint-disable-next-line max-len
      path: 'https://firebasestorage.googleapis.com/v0/b/explore-users.appspot.com/o/uploads%2Fd00225138%2F0a745ae9-8f73-4803-95f0-f6951793ab80.png?alt=media&token=fc445305-54db-4444-b72d-53a0f723a2fb'
    },{
      // eslint-disable-next-line max-len
      path: 'https://firebasestorage.googleapis.com/v0/b/explore-users.appspot.com/o/uploads%2Fd00225138%2F8c9e3b9a-dd77-4f7c-ba0f-59567c19c09f.png?alt=media&token=977044a4-01d8-41a3-8cfa-a0678ed7aaa9'
    },
    {
      // eslint-disable-next-line max-len
      path: 'https://firebasestorage.googleapis.com/v0/b/explore-users.appspot.com/o/uploads%2Fd00225138%2F0a745ae9-8f73-4803-95f0-f6951793ab80.png?alt=media&token=fc445305-54db-4444-b72d-53a0f723a2fb'
    },{
      // eslint-disable-next-line max-len
      path: 'https://firebasestorage.googleapis.com/v0/b/explore-users.appspot.com/o/uploads%2Fd00225138%2F8c9e3b9a-dd77-4f7c-ba0f-59567c19c09f.png?alt=media&token=977044a4-01d8-41a3-8cfa-a0678ed7aaa9'
    },
    {
      // eslint-disable-next-line max-len
      path: 'https://firebasestorage.googleapis.com/v0/b/explore-users.appspot.com/o/uploads%2Fd00225138%2F0a745ae9-8f73-4803-95f0-f6951793ab80.png?alt=media&token=fc445305-54db-4444-b72d-53a0f723a2fb'
    }
  ];
  constructor(private photoService: PhotoService, private modalController: ModalController) {}

  ngOnInit() {
  }

  async openModal(imagePassed: string) {
    //MODAL:
    const modal = await this.modalController.create({
      component: DetailedImagePage,
      componentProps: { image: imagePassed },
    });
    return await modal.present();
  }
}
