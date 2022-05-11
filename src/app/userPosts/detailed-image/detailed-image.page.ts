import { Component, Input, OnInit } from '@angular/core';
import {
  LoadingController,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import { getAuth } from 'firebase/auth';
import { PhotoService, UserPhoto } from 'src/app/services/photo.service';

@Component({
  selector: 'app-detailed-image',
  templateUrl: './detailed-image.page.html',
  styleUrls: ['./detailed-image.page.scss'],
})
export class DetailedImagePage implements OnInit {
  @Input() image: any;
  user = getAuth().currentUser.email;
  userPhoto: UserPhoto[] = [];
  photoObj: UserPhoto;
  storageurlPath: string;

  constructor(
    private photo: PhotoService,
    private loadingController: LoadingController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    const split = this.image.split('%2F'); //used to identify the end of the photo url
    const fileNameSplit = split[split.length - 1];
    const finalSplit = fileNameSplit.split('.');
    this.storageurlPath = finalSplit[0];
    //code in here to get the image's details from firestore db
    this.photo.getPhotos().subscribe((res) => {
      this.userPhoto = res;
    });
  }

  likePhoto() {
    //now split the image url so we can get the end of it
    const split = this.image.split('%2F'); //used to identify the end of the photo url
    const fileNameSplit = split[split.length - 1];
    const finalSplit = fileNameSplit.split('.');

    //then search the result of getPhotos() and select that image as our image for this page
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.userPhoto.length; i++) {
      if (this.userPhoto[i].path === finalSplit[0]) {
        //using the image's id,
        //modify the document
        //increase the like count by +1
        this.photo.likePhoto(this.userPhoto[i]);
      }
    }
  }

  async deleteImage() {
    const loading = await this.loadingController.create();
    await loading.present();
    const split = this.image.split('%2F'); //used to identify the end of the photo url
    const fileNameSplit = split[split.length - 1];
    const finalSplit = fileNameSplit.split('.');
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.userPhoto.length; i++) {
      if (this.userPhoto[i].path === finalSplit[0]) {
        this.photo.delete(this.userPhoto[i]);
      }
    }
    await loading.dismiss();
    window.location.replace('http://explore-users.web.app/user-photos');
  }

  async dismissModal() {
    return await this.modalCtrl.dismiss();
  }
}
