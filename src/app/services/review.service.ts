import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  collection,
  collectionData,
  CollectionReference,
  doc,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { getAuth } from 'firebase/auth';
import { Observable } from 'rxjs';
import { Review } from '../pages/review/review.page';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  locationName: string;
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private alertController: AlertController
  ) {}

  //take a review object, upload it to the database
  async addReview(review: Review) {
    //in the final slot for review, maybe use the review title
    //USE WHERE STATEMENT WHERE THE DOCUMENT ID = THE CURRENT USER'S EMAIL
    const revDocRef = doc(
      this.firestore,
      `userReviews/${getAuth().currentUser.email}/reviews/${review.title},${
        review.date
      }`
    );

    await setDoc(revDocRef, review);

    this.reverseGeocode(review.lat, review.lng, review);
  }

  async addReviewToLocation(locationReviewName: string, userReview: any){
    //Now to add the user's review to a collection for all reviews on the location supplied
    const locationReviewRef = doc(this.firestore, `locationReviews/${locationReviewName}/reviews/${userReview.title},${userReview.date}`);
    await setDoc(locationReviewRef, userReview);
  }

  //get reviews return a list of the user's reviews
  getReviews(): Observable<Review[]> {
    // const reviewRef = collection(this.firestore, `reviews/${getAuth().currentUser.email}/reviews`);
    const reviewRef = collection(
      this.firestore,
      `userReviews/${getAuth().currentUser.email}/reviews`
    );
    console.log('Reviews fetched');
    return collectionData(reviewRef) as Observable<Review[]>;
  }

  reverseGeocode(latitude: number, longitude: number, userReview: any) {
    //parse the numbers inputted (lat & lng)
    const geocoder = new google.maps.Geocoder();
    const latlng = {
      lat: parseFloat(latitude.toString()),
      lng: parseFloat(longitude.toString()),
    };
    geocoder
      .geocode({ location: latlng })
      .then((response) => {
        if (response.results[0]) {
          this.locationName = response.results[0].formatted_address;
          //call the method to add the locations review reference to it's own table
          this.addReviewToLocation(this.locationName, userReview);
        } else {
          this.showAlert(
            'Error',
            'An error has occurred, please try again later'
          );
        }
      })
      .catch((e) => window.alert('Geocoder failed due to: ' + e));
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
