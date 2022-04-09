import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { getAuth } from 'firebase/auth';
import { Trail } from 'src/app/services/tracking.service';

@Component({
  selector: 'app-detailed-user-trail',
  templateUrl: './detailed-user-trail.page.html',
  styleUrls: ['./detailed-user-trail.page.scss'],
})
export class DetailedUserTrailPage implements OnInit {
  @Input() trail: Trail;//to get trail from trail page
  verticies: any[] = [];
  auth = getAuth().currentUser.email;

  //for map view
  mapConfigurations = {
    disableDefaultUI: true,
    fullScreenControl: false,
    center: { lat: 0, lng: 0 },
    zoomControl: false,
    mapTypeId: 'hybrid',
    zoom: 18
  };

  polylineOpt = {
    strokeColor: '#205566',
    strokeOpacity: 1.0,
    strokeWeight: 6,
  };

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.mapConfigurations.center.lat = this.trail.points[0].lat;
    this.mapConfigurations.center.lng = this.trail.points[0].lng;
    //initalize the verticies
    this.verticies = this.trail.points;
  }

  async dismissModal() {
    return await this.modalController.dismiss();
  }
}
