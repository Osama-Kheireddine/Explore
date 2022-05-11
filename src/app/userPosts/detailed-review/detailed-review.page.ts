import { Component, Input, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { LoadingController, ModalController } from '@ionic/angular';
import { Review } from 'src/app/pages/review/review.page';
import { ReviewService } from 'src/app/services/review.service';

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
  };
  markerCoords =
  {
    position:{
      lat:0,
      lng:0,
    }
  };
  constructor(private reviewService: ReviewService, private modalCtrl: ModalController, private loading: LoadingController) { }

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

  async deleteReview(){
    const loading = await this.loading.create();
    await loading.present();
    this.reviewService.delete(this.review);
    await loading.dismiss();
    // window.location.replace('http://localhost:8100/reviews');
    window.location.replace('http://explore-users.web.app/reviews');
  }

}
