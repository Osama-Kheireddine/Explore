import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  collection,
  collectionData,
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
  constructor(private auth: Auth, private firestore: Firestore, private alertController: AlertController) {}

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
    // then we want to add that review's reference to the location the use has specified
    // reverse geocode so the path looks like:
    // 'locationReviews/${reverseGeocodedLatLng}/reviews'

    this.reverseGeocode(review.lat, review.lng);
    // const locationReviewRef = ;
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

  reverseGeocode(latitude: number, longitude: number) {
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
          return response.results[0].formatted_address;
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
