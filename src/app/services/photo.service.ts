import { Injectable } from '@angular/core';
import { Auth, getAuth } from '@angular/fire/auth';
import {
  Firestore,
  doc,
  setDoc,
  collectionData,
  collection,
  updateDoc,
} from '@angular/fire/firestore';
import { getStorage, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { AlertController } from '@ionic/angular';
import { deleteDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL } from 'firebase/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  photoRef: UserPhoto[];
  likedContent: UserLikes[] = [];
  locationName: string;
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage,
    private alertController: AlertController
  ) {}

  async takePhoto(image: UserPhoto) {
    if (image) {
      this.uploadImage(image);
    }
  }

  async uploadImage(cameraFile: UserPhoto) {
    const email = getAuth().currentUser.email;
    const emailsplit = email.split('@');
    const fileName = cameraFile.webviewPath;
    const split = fileName.split('/'); //used to identify the end of the photo url
    const fileNameSplit = split[split.length - 1];

    const photoPath = `uploads/${emailsplit[0]}/${fileNameSplit}.png`;
    const storageRef = ref(getStorage(), photoPath);
    const response = await fetch(cameraFile.webviewPath);
    const blob = await response.blob(); //we will upload the blob

    await uploadBytes(storageRef, blob)
      .then((res) => {
        // add the image to the user's photos collection
        const photoRef = doc(
          this.firestore,
          `photos/${emailsplit[0]}/images/${fileNameSplit}`
        );
        const photoToAdd: UserPhoto = {
          webviewPath: fileName,
          user: cameraFile.user,
          path: fileNameSplit,
          likes: 0,
          description: cameraFile.description, //pass the description the user has created with it
          coordinates: cameraFile.coordinates, //take the user's current coords
        };
        setDoc(photoRef, photoToAdd);
        //add the photo's ref for a location
        this.addPhotoToLocation(photoToAdd);
      })
      .catch((error) => {
        console.error('Console logged an error: ', error);
      });
  }

  async addPhotoToLocation(image: UserPhoto) {
    //parse the numbers inputted (lat & lng)
    const geocoder = new google.maps.Geocoder();
    const latlng = {
      lat: parseFloat(image.coordinates.lat.toString()),
      lng: parseFloat(image.coordinates.lng.toString()),
    };
    geocoder
      .geocode({ location: latlng })
      .then((response) => {
        if (response.results[0]) {
          this.locationName = response.results[0].formatted_address;
          //call the method to add the locations review reference to it's own table
          const photoRef = doc(
            this.firestore,
            `locationPhotos/${this.locationName}/images/${image.path}`
          );

          setDoc(photoRef, image);
        } else {
          this.showAlert(
            'Error',
            'An error has occurred, please try again later'
          );
        }
      })
      .catch((e) => window.alert('Geocoder failed due to: ' + e));
  }

  async likePhoto(imageID: UserPhoto) {
    //get the user's likes & make sure it's not there to avoid duplication
    await this.getUserLikesCollection().subscribe((res) => {
      this.likedContent = res;
      this.verifyLike(imageID);
    });
  }

  verifyLike(imageID: UserPhoto) {
    let likeFlag = false;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.likedContent.length; i++) {
      if (
        this.likedContent[i].path === imageID.path &&
        this.likedContent[i].user === this.auth.currentUser.email
      ) {
        likeFlag = true;
      }
    }
    //flag is false, meaning we havent liked the image
    if (!likeFlag) {
      const email = getAuth().currentUser.email;
      const emailsplit = email.split('@');
      const photoRef = doc(
        this.firestore,
        `photos/${emailsplit[0]}/images/${imageID.path}`
      );
      const likes = imageID.likes + 1;
      updateDoc(photoRef, { likes });
      //add like the photo from the location photos collection too!
      //reverse geocode the location
      //add that user's like to a collection of their likes to avoid duplication in future
      this.addToLikeCollection(imageID.path);
    }
  }

  addToLikeCollection(path: string) {
    const likePhotoRef = doc(
      this.firestore,
      `likes/photos/${this.auth.currentUser.email}/${path}`
    );
    const userLikes: UserLikes = {
      path,
      user: this.auth.currentUser.email,
      likeType: 'photo',
    };
    setDoc(likePhotoRef, userLikes);
  }

  getUserLikesCollection(): Observable<UserLikes[]> {
    const likeRef = collection(
      this.firestore,
      `likes/photos/${this.auth.currentUser.email}`
    );
    return collectionData(likeRef) as Observable<UserLikes[]>;
  }

  getPhotos(): Observable<UserPhoto[]> {
    //get the reference to the file name from firestore
    //path to the photo name in firestore
    const emailSplit = getAuth().currentUser.email.split('@');

    const firestorePhotoRef = collection(
      this.firestore,
      `photos/${emailSplit[0]}/images`
    );
    return collectionData(firestorePhotoRef) as Observable<UserPhoto[]>;
  }

  getAllPhotos(locName: string): Observable<UserPhoto[]> {
    const photoRef = collection(
      this.firestore,
      `locationPhotos/${locName}/images`
    );
    return collectionData(photoRef) as Observable<UserPhoto[]>;
  }

  delete(image: UserPhoto) {
    const geocoder = new google.maps.Geocoder();
    //get the user & delete from the user photos
    const user = image.user.split('@');
    const userPhotoRef = doc(
      this.firestore,
      `photos/${user[0]}/images/${image.path}`
    );
    deleteDoc(userPhotoRef);

    //get the location & delete from location photos
    geocoder
      .geocode({ location: image.coordinates })
      .then((response) => {
        if (response.results[0]) {
          this.locationName = response.results[0].formatted_address;
          //call the method to add the locations review reference to it's own table
          const photoRef = doc(
            this.firestore,
            `locationPhotos/${this.locationName}/images/${image.path}`
          );

          deleteDoc(photoRef);
        } else {
          this.showAlert(
            'Error',
            'An error has occurred, please try again later'
          );
        }
      })
      .catch((e) => window.alert('Geocoder failed due to: ' + e));

    //get the storage path & delete from storage
    const storage = getStorage();
    const pathReference = ref(storage, `uploads/${user[0]}/${image.path}.png`);
    deleteObject(pathReference)
      .then(() => {})
      .catch((err) => {});
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
export interface UserLikes {
  path: string;
  user: string;
  likeType: string;
}
export interface UserPhoto {
  webviewPath: string; //used for displaying on device when taking photo
  user: string;
  path: string;
  likes: number;
  description: string;
  coordinates: { lat: number; lng: number }; //change this to a latlng literal if you can
  //put extra data here such as coords etc.
}
