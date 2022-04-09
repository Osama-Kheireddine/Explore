import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReviewService } from 'src/app/services/review.service';
import { DetailedReviewPage } from 'src/app/userPosts/detailed-review/detailed-review.page';
import { Review } from '../review/review.page';

@Component({
  selector: 'app-all-location-reviews',
  templateUrl: './all-location-reviews.page.html',
  styleUrls: ['./all-location-reviews.page.scss'],
})
export class AllLocationReviewsPage implements OnInit {
  @Input() latLong: any; placeNameForHeader: any;
  locationName: string;
  reviews: Review[] = [];
  constructor(
    private reviewService: ReviewService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
     //parse the points. We will base it off starting location
     const geocoder = new google.maps.Geocoder();
     const latlng = {
       lat: parseFloat(this.latLong.lat.toString()),

       lng: parseFloat(this.latLong.lng.toString()),
      };
      console.log(latlng);
     geocoder
       .geocode({ location: latlng })
       .then((response) => {
         if (response.results[0]) {
           this.locationName = response.results[0].formatted_address;
           return this.reviewService.getAllReviews(this.locationName).subscribe((res: Review[]) => {
             this.reviews = res;
             this.reviews.reverse();
           });

         }
       })
       .catch((e) => window.alert('Geocoder failed due to: ' + e));
  }

  async openModal(reviewPassed: Review) {
    //MODAL:
    const modal = await this.modalController.create({
      component: DetailedReviewPage,
      componentProps: { review: reviewPassed },
    });
    return await modal.present();
  }

  async dismissModal() {
    return await this.modalController.dismiss();
  }
}
