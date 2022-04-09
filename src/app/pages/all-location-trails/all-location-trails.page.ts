import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TrackingService, Trail } from 'src/app/services/tracking.service';
import { DetailedUserTrailPage } from 'src/app/userPosts/detailed-user-trail/detailed-user-trail.page';

@Component({
  selector: 'app-all-location-trails',
  templateUrl: './all-location-trails.page.html',
  styleUrls: ['./all-location-trails.page.scss'],
})
export class AllLocationTrailsPage implements OnInit {
  @Input() latLong: any; placeNameForHeader: any;
  locationName: string;
  trails: Trail[] = [];
  constructor(private modalController: ModalController, private trackingService: TrackingService) { }

  ngOnInit() {
    //parse the points. We will base it off starting location
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
          return this.trackingService.getAllTrails(this.locationName).subscribe((res: Trail[]) => {
            this.trails = res;
            this.trails.reverse();
          });

        }
      })
      .catch((e) => window.alert('Geocoder failed due to: ' + e));
  }

  async openModal(trail: Trail){
    const modal = await this.modalController.create({
      component: DetailedUserTrailPage,
      componentProps: { trail },
    });
    return await modal.present();
  }

  async dismissModal() {
    return await this.modalController.dismiss();
  }
}
