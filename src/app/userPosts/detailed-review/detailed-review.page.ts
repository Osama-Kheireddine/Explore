import { Component, Input, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { ModalController } from '@ionic/angular';
import { Review } from 'src/app/pages/review/review.page';

@Component({
  selector: 'app-detailed-review',
  templateUrl: './detailed-review.page.html',
  styleUrls: ['./detailed-review.page.scss'],
})
export class DetailedReviewPage implements OnInit {
  @Input() review: Review;
  auth = getAuth().currentUser.email;
  center: google.maps.LatLngLiteral;
  //for map view
  mapConfigurations = {
    disableDefaultUI: true,
    fullScreenControl: false,
    zoomControl: false,
    mapTypeId: 'hybrid',
    //turn off the poi
    // styles: {
    //   featureType: 'poi.business',
    //   stylers: [{visibility: 'off'}]
    // }
  };
  markerCoords =
  {
    position:{
      lat:0,
      lng:0,
    }
  };
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    //initalize the center of the map (the review's location)
    this.center = {lat: this.review.lat, lng: this.review.lng};
    //markerCoords
    this.markerCoords.position.lat = this.review.lat;
    this.markerCoords.position.lng = this.review.lng;
  }

  async dismissModal(){
    return await this.modalCtrl.dismiss();
  }

}
