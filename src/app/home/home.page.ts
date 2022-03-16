import { Component, OnInit } from '@angular/core';

import { Geolocation } from '@capacitor/geolocation';
import { ModalController } from '@ionic/angular';
import { PostPage } from '../pages/post/post.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  center: google.maps.LatLngLiteral;
  lat: any;
  long: any;
  zoom: 4;
  mapConfigurations = {
    disableDefaultUI: true,
    fullScreenControl: false,
    zoomControl: false,
  };

  constructor(public modalController: ModalController) {}
  async ngOnInit() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.lat = coordinates.coords.latitude;
    this.long = coordinates.coords.longitude;
    this.center = { lat: this.lat, lng: this.long };
  }
}
