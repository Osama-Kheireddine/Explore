import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { getAuth } from 'firebase/auth';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { UserPhoto, PhotoService } from 'src/app/services/photo.service';
import { DetailedImagePage } from '../detailed-image/detailed-image.page';

@Component({
  selector: 'app-user-photos',
  templateUrl: './user-photos.page.html',
  styleUrls: ['./user-photos.page.scss'],
})
export class UserPhotosPage implements OnInit {
  imageReferences = [];
  imageURLs: string;
  images = [];
  constructor(
    private photoService: PhotoService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    const emailSplit = getAuth().currentUser.email.split('@');
    let imageRef;
    //get photo file names from firestore, then pass to a function to create the list of photos to return
    this.photoService.getPhotos().subscribe((res: UserPhoto[]) => {
      this.imageReferences = res;
      //now use this.images to get all photos
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < this.imageReferences.length; i++) {
        const storage = getStorage();
        const pathReference = ref(
          storage,
          `uploads/${emailSplit[0]}/${this.imageReferences[i].path}.png`
        );
        getDownloadURL(pathReference)
          .then((url) => {
            imageRef = url;
            this.images.push(imageRef);
          })
          .catch((error) => {
            alert(error);
          });
      }
      this.images = [];
    });
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
