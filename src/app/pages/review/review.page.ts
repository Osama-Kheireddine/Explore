import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { getAuth } from 'firebase/auth';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements AfterViewInit {
  // @ViewChild is used to query the input element & the map
  @ViewChild('mapSearchField') searchField: ElementRef; //mapSearchField comes from #mapSearchField in the input element
  // eslint-disable-next-line max-len
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap; //the map is a component so we can query component instead of template reference similar to above

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
  locationName: string;
  lng: number;
  reviewBody: string;
  reviewsList: Review[];
  markers = [];
  constructor(
    private review: ReviewService,
    private alertController: AlertController,
    private loadingController: LoadingController,
  ) {}

  // use ngAfterViewInit() to tie the two together (map and search bar input)
  ngAfterViewInit() {
    //create new search box
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
          this.markers = [];
          this.addMarker();
        } else {
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.markers = [];
          this.addMarker();
          bounds.extend(place.geometry.location);
        }
      });
      this.map.fitBounds(bounds);
    });
  }

  addMarker() {
    this.markers.push({
      position: {
        lat: this.lat,
        lng: this.lng,
      },
      label: {
        color: 'red',
        text: 'Review here ',
      },
      title: 'Marker title ',
      info: 'Marker info ',
      options: {
        animation: google.maps.Animation.DROP,
      },
    });
  }

  async postReview() {
    const loading = await this.loadingController.create();
    await loading.present();

    //flag if the location's lat & long are empty
    if (!this.lat && !this.lng) {
      this.showAlert('Error', 'Please search for a location to review!');
    } else {
      this.reverseGeocode(this.lat, this.lng);
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

  //now we want to get the latitude & longitude of the review
  //then display that result as the review's location
  //reverse geo-code!!
  async reverseGeocode(latitude: number, longitude: number) {
    //parse the numbers inputted (lat & lng)
    const geocoder = new google.maps.Geocoder();
    const latlng = {
      lat: parseFloat(latitude.toString()),
      lng: parseFloat(longitude.toString()),
    };
    await geocoder
      .geocode({ location: latlng })
      .then((response) => {
        if (response.results[0]) {
          this.locationName = response.results[0].formatted_address;

          //finalize the post here
          this.finalizePost(this.locationName);
        } else {
          this.showAlert(
            'Error',
            'An error has occurred, please try again later'
          );
        }
      })
      .catch((e) => window.alert('Geocoder failed due to: ' + e));
  }

  async finalizePost(location: string) {
    //get the current date to add to the review
    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
    const review: Review = {
      //to run a query to find this user in the user's collection & get their username/name to display beside the review
      title: this.title,
      user: getAuth().currentUser.email,
      reviewBody: this.reviewBody,
      locName: location,
      lat: this.lat,
      lng: this.lng,
      date: formattedDate,
    };
    await this.review.addReview(review);
    window.location.reload();
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
  user: any;
  title: string;
  reviewBody: string;
  locName: string;
  lat: number;
  lng: number;
  date: any;
}
