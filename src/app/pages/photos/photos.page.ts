import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import {
  AlertController,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { PhotoService, UserPhoto } from 'src/app/services/photo.service';
import { MapModalPage } from '../map-modal/map-modal.page';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit {
  photos: UserPhoto[] = [];
  locationAdded = false;
  description: string;
  lat: number;
  lng: number;
  coordinates: { lat: number; lng: number };
  photoTaken: boolean;
  photoLocation = '';
  constructor(
    private photo: PhotoService,
    private modalCtrl: ModalController,
    private loading: LoadingController,
    private alert: AlertController,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    this.photoTaken = false;
    //get the user's coordinates to add to the database
    this.lat = await (await Geolocation.getCurrentPosition()).coords.latitude;
    this.lng = await (await Geolocation.getCurrentPosition()).coords.longitude;
    this.coordinates = { lat: this.lat, lng: this.lng };
  }

  async takePhoto() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    if (capturedPhoto) {
      this.photos.unshift({
        webviewPath: capturedPhoto.webPath,
        user: getAuth().currentUser.email,
        path: '',
        likes: 0,
        description: '',
        coordinates: this.coordinates,
      });
      this.photoTaken = true;
    }
  }

  reload() {
    window.location.reload();
  }

  async postPhoto() {
    const loading = await this.loading.create();
    await loading.present();
    if (this.locationAdded) {
      //add all the description to the photo
      this.photos[0].description = this.description;
      this.photos[0].coordinates.lat = this.coordinates.lat;
      this.photos[0].coordinates.lng = this.coordinates.lng;
      this.photo.takePhoto(this.photos[0]);
      this.photoTaken = false;
      this.photos = [];
      this.photoLocation = '';
      this.presentToast();
    } else {
      this.showAlert('Error', 'Please tag a location to the photo');
    }
    await loading.dismiss();
  }

  async openMap() {
    const modal = await this.modalCtrl.create({
      component: MapModalPage,
      breakpoints: [1],
      initialBreakpoint: 1,
    });
    modal.onDidDismiss().then((res: any) => {
      this.saveCoords(res.data[0], res.data[1]);
    });

    await modal.present();
  }

  async saveCoords(lat: number, lng: number) {
    this.coordinates.lat = lat;
    this.coordinates.lng = lng;

    const geocoder = new google.maps.Geocoder();
    const latlng = {
      lat: parseFloat(lat.toString()),
      lng: parseFloat(lng.toString()),
    };
    await geocoder
      .geocode({ location: latlng })
      .then((response) => {
        if (response.results[0]) {
          this.photoLocation = response.results[0].formatted_address;

          //finalize the post here
          this.saveLocation(this.photoLocation);
          this.locationAdded = true;
        } else {
          this.showAlert(
            'Error',
            'An error has occurred, please try again later'
          );
        }
      })
      .catch((e) => window.alert('Geocoder failed due to: ' + e));
  }

  saveLocation(loc: string) {
    this.photoLocation = loc;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Photo posted!',
      duration: 1500,
    });
    toast.present();
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
