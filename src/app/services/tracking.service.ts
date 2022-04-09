import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import {
  collectionData,
  doc,
  Firestore,
  getDoc,
  orderBy,
  setDoc,
} from '@angular/fire/firestore';
import { arrayUnion, collection, serverTimestamp } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Marker } from '../pages/track-trail/track-trail.page';

@Injectable({
  providedIn: 'root',
})
export class TrackingService {
  locationName: string;
  //fix date at end
  currentDate = new Date();
  formattedDate = this.formatDate(this.currentDate);

  auth = getAuth().currentUser.email;

  constructor(private firestore: Firestore) {}
//TODO:
  async add(points: Marker[]) {
    const mappedTrailDetails: Trail = {
      date: this.formattedDate,
      points,
    };
    const trailRef = doc(
      this.firestore,
      `userTrails/${this.auth}/trails/${this.formattedDate}`
    );
  await setDoc(trailRef, mappedTrailDetails);
  this.reverseGeocode(mappedTrailDetails);
  // window.location.reload();
  }

  reverseGeocode(trail: Trail) {
    //parse the points. We will base it off starting location
    const geocoder = new google.maps.Geocoder();
    const latlng = {
      lat: parseFloat(trail.points[0].lat.toString()),
      lng: parseFloat(trail.points[0].lng.toString()),
    };
    geocoder
      .geocode({ location: latlng })
      .then((response) => {
        if (response.results[0]) {
          this.locationName = response.results[0].formatted_address;
          console.log(this.locationName);

          //call the method to add the locations review reference to it's own table
          this.addTrailToLocation(this.locationName, trail);
        }
      })
      .catch((e) => window.alert('Geocoder failed due to: ' + e));
  }

  async addTrailToLocation(locationNameGeocoded: string, trail: Trail){
    const locationTrailRef = doc(this.firestore,
      `locationTrails/${locationNameGeocoded}/trails/${trail.points[0].lat},${trail.points[0].lng},${trail.date}`);
      await setDoc(locationTrailRef, trail);
  }

  formatDate(date: Date) {
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
      date.getSeconds() +
      ':' +
      date.getMilliseconds();
    return formattedDate;
  }

  getUsersTrails(): Observable<Trail[]> {
    const trailRef = collection(
      this.firestore,
      `/userTrails/${this.auth}/trails`
    );
    return collectionData(trailRef) as Observable<Trail[]>;
  }
}
export interface Trail {
  date: any;
  points: Marker[];
}
