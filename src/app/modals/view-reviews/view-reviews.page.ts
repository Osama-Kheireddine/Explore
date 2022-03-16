import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Review } from 'src/app/pages/review/review.page';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-view-reviews',
  templateUrl: './view-reviews.page.html',
  styleUrls: ['./view-reviews.page.scss'],
})
export class ViewReviewsPage implements OnInit {
  reviewsList: Review[];
  constructor(private review: ReviewService, private modalController: ModalController) {}

  ngOnInit() {
    //get reviews
    return this.review.getReviews().subscribe((res: Review[]) => {
      console.log('Reviews: ', res);
      // console.log('current user', getAuth().currentUser.email);

      this.reviewsList = res;
    });
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
