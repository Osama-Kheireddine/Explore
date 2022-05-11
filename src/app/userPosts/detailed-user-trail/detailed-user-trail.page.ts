import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { getAuth } from 'firebase/auth';
import { TrackingService, Trail } from 'src/app/services/tracking.service';

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

  constructor(private trailService: TrackingService, private modalController: ModalController, private loading: LoadingController) {}

  ngOnInit() {
    this.mapConfigurations.center.lat = this.trail.points[0].lat;
    this.mapConfigurations.center.lng = this.trail.points[0].lng;
    //initalize the verticies
    this.verticies = this.trail.points;
  }

  async deleteTrail(){
    const loading = await this.loading.create();
    await loading.present();
    this.trailService.delete(this.trail);
    await loading.dismiss();
    // window.location.replace('http://localhost:8100/reviews');
    window.location.replace('http://explore-users.web.app/view-your-trails');
  }

  async dismissModal() {
    return await this.modalController.dismiss();
  }
}
