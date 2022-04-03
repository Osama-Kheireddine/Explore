import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { arrayUnion, collection } from 'firebase/firestore';
import { Markers } from '../pages/track-trail/track-trail.page';

@Injectable({
  providedIn: 'root',
})
export class TrackingService {
  //fix date at end
  currentDate = new Date();
  formattedDate = this.formatDate(this.currentDate);

  auth = getAuth().currentUser.email;
  constructor(private firestore: Firestore) {}

  async add(marker: Markers) {
    const trailRef = doc(
      this.firestore,
      `userTrails/${this.auth}/${this.formattedDate}/${marker.timestamp}`
    );
    console.log(marker.timestamp);
    // await arrayUnion(trailRef, marker);
    await setDoc(trailRef, marker);
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
}
