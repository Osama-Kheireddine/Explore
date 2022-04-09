import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
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
  mapMarkers: Marker[] = [];
  // marker: Markers = null;
  // databaseMarkers: Markers[];
  isTracking = false;
  watch = null;
  //poly line stuff
  polylineOpt = {
    path: [], //this will be the markers we're adding to the db
    strokeColor: '#205566',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  };
  vertices: google.maps.LatLngLiteral[] = [
    { lat: 13, lng: 13 },
    { lat: -13, lng: 0 },
    { lat: 13, lng: -13 },
  ];
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
  constructor(
    private trackingService: TrackingService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.lat = coordinates.coords.latitude;
    this.long = coordinates.coords.longitude;
    this.center = { lat: this.lat, lng: this.long };
  }

  startTracking() {
    this.isTracking = true;
    this.watch = Geolocation.watchPosition(
      { timeout: 2350, enableHighAccuracy: true },
      (position, err) => {
        //get the position, add it to the markers array for database entry
        if (position && this.isTracking === true) {
          const marker: Marker = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            timestamp: position.timestamp,
          };
          // console.log(this.mapMarkers);
          this.mapMarkers.push(marker);

          this.polylineOpt.path.push({ lat: marker.lat, lng: marker.lng });

          // this.addToPolyLinePath(marker);
        }
      }
    );
  }

  async stopTracking() {
    this.addNewLocation(
      this.mapMarkers
    );
    this.presentToast();
    //call draw polyline method
    Geolocation.clearWatch({ id: this.watch }).then(() => {
      this.isTracking = false;
      this.mapMarkers = [];
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
