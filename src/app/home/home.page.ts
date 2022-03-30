import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { GoogleMap } from '@angular/google-maps';

import { Geolocation } from '@capacitor/geolocation';
import { ModalController } from '@ionic/angular';
import { PostPage } from '../pages/post/post.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild('mapSearchField') searchField: ElementRef; //mapSearchField comes from #mapSearchField in the input element
  // eslint-disable-next-line max-len
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap; //the map is a component so we can query component instead of template reference similar to above
  center: google.maps.LatLngLiteral;
  lat: any;
  long: any;
  zoom: 4;
  mapConfigurations = {
    disableDefaultUI: true,
    fullScreenControl: false,
    zoomControl: false,
    mapTypeId: 'hybrid'
  };

  constructor(public modalController: ModalController) {}
  async ngOnInit() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.lat = coordinates.coords.latitude;
    this.long = coordinates.coords.longitude;
    this.center = { lat: this.lat, lng: this.long };

  }

  ngAfterViewInit(){
    //create search box
    const searchBox = new google.maps.places.SearchBox(
      this.searchField.nativeElement
    );
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      this.searchField.nativeElement
    );
    searchBox.addListener('places_changed', () =>{
      const places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }
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
          this.long = place.geometry.location.lng();
        } else {
          this.lat = place.geometry.location.lat();
          this.long = place.geometry.location.lng();
          bounds.extend(place.geometry.location);
        }
      });
      this.map.fitBounds(bounds);
    });
  }
}
