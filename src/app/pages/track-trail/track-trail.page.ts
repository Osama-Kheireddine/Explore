import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { ToastController } from '@ionic/angular';
import { TrackingService } from 'src/app/services/tracking.service';

@Component({
  selector: 'app-track-trail',
  templateUrl: './track-trail.page.html',
  styleUrls: ['./track-trail.page.scss'],
})
export class TrackTrailPage implements OnInit, AfterViewInit {
  //for tracking
  mapMarkers: Markers[] = [];
  // marker: Markers = null;
  // databaseMarkers: Markers[];
  isTracking = false;
  watch = null;
  //poly line stuff
  polylineOpt = {
    path: [], //this will be the markers we're adding to the db
    strokeColor: '#000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  };
  //
  center: google.maps.LatLngLiteral;
  lat: any;
  long: any;
  mapConfigurations = {
    disableDefaultUI: true,
    fullScreenControl: false,
    zoomControl: false,
    mapTypeId: 'hybrid',
  };
  constructor(private trackingService: TrackingService, private toastController: ToastController) {}

  async ngOnInit() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.lat = coordinates.coords.latitude;
    this.long = coordinates.coords.longitude;
    this.center = { lat: this.lat, lng: this.long };
  }

  async ngAfterViewInit() {
    const path = []; //we can upload the polylines to firebase and then get them back when we want to display past trails
    this.polylineOpt = { ...this.polylineOpt, path };
  }

  startTracking() {
    this.isTracking = true;
    this.watch = Geolocation.watchPosition({}, (position, err) => {
      //get the position, add it to the markers array for database entry
      console.log('new pos: ', position);
      if (position) {
        // this.markers;
        this.addNewLocation(
          position.coords.latitude,
          position.coords.longitude,
          position.timestamp
        );
      }
    });
  }

  stopTracking() {
    Geolocation.clearWatch({ id: this.watch }).then(() => {
      this.isTracking = false;
    });
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Trail mapped!\nView in the "trails" tab in account',
      duration: 1000
    });
    toast.present();
    window.location.reload();
  }

  addNewLocation(lat, lng, timestamp) {
    const marker: Markers = {
      lat,
      lng,
      timestamp
    };
    this.mapMarkers.push(marker);//adds to marker array

    this.trackingService.add(marker);

  }
}
export interface Markers {
  lat: number;
  lng: number;
  timestamp: any;
}
