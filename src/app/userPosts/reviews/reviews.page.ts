import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { AlertController, ModalController } from '@ionic/angular';
import { Review } from 'src/app/pages/review/review.page';
import { ReviewService } from 'src/app/services/review.service';
import { DetailedReviewPage } from '../detailed-review/detailed-review.page';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {
  reviewList: Review[];
  auth = getAuth().currentUser.email;
  timeSince: any;
  locationsList: string;
  constructor(
    private review: ReviewService,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    //get reviews
    return this.review.getReviews().subscribe((res: Review[]) => {
      // console.log('Reviews: ', res);
      this.reviewList = res;
    });
  }

  async openModal(reviewPassed: Review) {
    //MODAL:
    const modal = await this.modalController.create({
      component: DetailedReviewPage,
      componentProps: { review: reviewPassed },
    });
    return await modal.present();
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
