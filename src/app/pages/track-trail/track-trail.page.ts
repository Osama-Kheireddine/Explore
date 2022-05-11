import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { ToastController } from '@ionic/angular';
import { TrackingService } from 'src/app/services/tracking.service';

@Component({
  selector: 'app-track-trail',
  templateUrl: './track-trail.page.html',
  styleUrls: ['./track-trail.page.scss'],
})
export class TrackTrailPage implements OnInit {
  //for tracking
  trailCoordinates: Marker[] = [];
  isTracking = false;
  watch = null;
  currentLocationMarker = [];
  //poly-lines
  polylineOpt = {
    path: [], //this will be the markers we're adding to be drawn on the map
    strokeColor: '#205566',
    strokeOpacity: 1.0,
    strokeWeight: 6,
  };
  center: google.maps.LatLngLiteral;
  lat: any;
  long: any;
  mapConfigurations = {
    disableDefaultUI: true,
    fullScreenControl: false,
    zoomControl: false,
    mapTypeId: 'hybrid',
  };
  constructor(
    private trackingService: TrackingService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.lat = coordinates.coords.latitude;
    this.long = coordinates.coords.longitude;
    this.center = { lat: this.lat, lng: this.long };
    this.addMarker(this.lat, this.long);
  }

  addMarker(lat: number, lng: number) {
    this.currentLocationMarker.push({
      position: {
        lat,
        lng,
      },
      label: {
        color: 'red',
        text: 'You are here ',
      },
      title: 'Marker title ',
      info: 'Marker info ',
      opacity: 0.6,
    });
  }

  startTracking() {
    const path = [];
    this.isTracking = true;
    this.watch = Geolocation.watchPosition(
      { timeout: 3350, enableHighAccuracy: true },
      (position, err) => {
        if (position && this.isTracking === true) {
          path.push(
            new google.maps.LatLng({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          );
          this.polylineOpt = { ...this.polylineOpt, path };
          const marker: Marker = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            timestamp: position.timestamp,
          };
          //push a coord to the most recent location
          this.trailCoordinates.push(marker);
        }
      }
    );
  }

  async stopTracking() {
    this.addNewLocation(this.trailCoordinates); //adds the trail to the db from the map markers array we populate while tracking
    this.presentToast();
    //call draw polyline method
    Geolocation.clearWatch({ id: this.watch }).then(() => {
      this.isTracking = false;
      this.trailCoordinates = []; //clear the markers array
      this.polylineOpt.path = [];
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Trail mapped!\nView in the "trails" tab in account',
      duration: 2000,
    });
    toast.present();
  }

  async addNewLocation(points: Marker[]) {
    this.trackingService.add(points);
  }
}
export interface Marker {
  lat: number;
  lng: number;
  timestamp: any;
}
