import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { getAuth } from 'firebase/auth';
import { Observable } from 'rxjs';
import { ViewReviewsPage } from 'src/app/modals/view-reviews/view-reviews.page';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements AfterViewInit {
  // @ViewChild is used to query the input element & the map
  @ViewChild('mapSearchField') searchField: ElementRef; //mapSearchField comes from #mapSearchField in the input element
  @ViewChild(GoogleMap) map: GoogleMap; //the map is a component so we can query component instead of template reference similar to above

  mapConfigurations = {
    disableDefaultUI: true,
    fullScreenControl: false,
    zoomControl: false,
  };
  initialCoord = {
    lat: 53.9843,
    lng: -6.3934,
  };
  title: string;
  lat: number;
  lng: number;
  reviewBody: string;
  reviewsList: Review[];
  constructor(
    private review: ReviewService,
    private modalController: ModalController,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  // use ngAfterViewInit() to tie the two together (map and search bar input)
  ngAfterViewInit() {
    //create new search box instance
    const searchBox = new google.maps.places.SearchBox(
      this.searchField.nativeElement //pass the searchField as a native element
      //this ties our inputfield with the searchBox
    );
    //now we add the searchField on the map top center is for the loc on the map view (top center)
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      this.searchField.nativeElement
    );
    //now we add a listener to the searchBox as it emits a places_changed event when a new location has been selected
    searchBox.addListener('places_changed', () => {
      //get the places returned by the search box
      const places = searchBox.getPlaces();

      //run these checks
      if (places.length === 0) {
        return;
      }
      //use the place geometry to create new bounds & update map center
      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          return;
        }
        if (place.geometry.viewport) {
          //lat and long used to set the location of the place being reviewed
          //only a geocode has a viewport
          bounds.union(place.geometry.viewport);
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
        } else {
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          bounds.extend(place.geometry.location);
        }
      });
      this.map.fitBounds(bounds);
    });
  }

  async postReview() {
    const loading = await this.loadingController.create();
    await loading.present();
    //get the current date to add to the review
    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
    //flag if the location's lat & long are empty
    if (!this.lat && !this.lng) {
      this.showAlert('Error', 'Please search for a location to review!');
    } else {
      const review: Review = {
        title: this.title,
        reviewBody: this.reviewBody,
        lat: this.lat,
        lng: this.lng,
        date: formattedDate,
      };
      await this.review.addReview(review);
    }
    await loading.dismiss();
  }

  formatDate(date: Date) {
    // eslint-disable-next-line max-len
    const formattedDate =
      date.getDate() +
      '-' +
      (date.getMonth() + 1) +
      '-' +
      date.getFullYear() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getMilliseconds();
    return formattedDate;
  }

  //MODAL:
  async presentModal() {
    const modal = await this.modalController.create({
      component: ViewReviewsPage,
      cssClass: '',
    });
    return await modal.present();
  }
  //ALERT CONTROLLER FOR LOOKS
  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}

export interface Review {
  title: string;
  reviewBody: string;
  lat: number;
  lng: number;
  date: any;
}
