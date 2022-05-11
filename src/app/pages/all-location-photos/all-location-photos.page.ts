import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { PhotoService, UserPhoto } from 'src/app/services/photo.service';
import { DetailedImagePage } from 'src/app/userPosts/detailed-image/detailed-image.page';

@Component({
  selector: 'app-all-location-photos',
  templateUrl: './all-location-photos.page.html',
  styleUrls: ['./all-location-photos.page.scss'],
})
export class AllLocationPhotosPage implements OnInit {
  @Input() latLong: any;
  placeNameforHeader: any;
  locationName: string;
  photos: UserPhoto[] = [];
  imageReferences = [];
  constructor(
    private photoService: PhotoService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    let imageRef;
    //parse the points
    const geocoder = new google.maps.Geocoder();
    const latlng = {
      lat: parseFloat(this.latLong.lat.toString()),

      lng: parseFloat(this.latLong.lng.toString()),
    };
    geocoder
      .geocode({ location: latlng })
      .then((response) => {
        if (response.results[0]) {
          this.locationName = response.results[0].formatted_address;
          this.photoService
            .getAllPhotos(this.locationName)
            .subscribe((res: UserPhoto[]) => {
              this.imageReferences = res;

              // eslint-disable-next-line @typescript-eslint/prefer-for-of
              for (let i = 0; i < this.imageReferences.length; i++) {
                const emailSplit = this.imageReferences[i].user.split('@');
                const storage = getStorage();
                const pathReference = ref(
                  storage,
                  `uploads/${emailSplit[0]}/${this.imageReferences[i].path}.png`
                );
                getDownloadURL(pathReference)
                  .then((url) => {
                    imageRef = url;
                    this.photos.push(imageRef);
                  })
                  .catch((error) => {
                    alert(error);
                  });
              }
              this.photos = [];
            });
        }
      })
      .catch((e) => window.alert('Geocoder failed due to: ' + e));
  }

  async openModal(imagePassed: UserPhoto) {
    //MODAL:
    const modal = await this.modalController.create({
      component: DetailedImagePage,
      componentProps: { image: imagePassed },
    });
    return await modal.present();
  }

  async dismissModal(){
    await this.modalController.dismiss();
  }
}
