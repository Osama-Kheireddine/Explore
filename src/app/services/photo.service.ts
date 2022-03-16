import { Injectable } from '@angular/core';
import { Auth, getAuth } from '@angular/fire/auth';
import { Firestore, doc, setDoc, collectionData, collection } from '@angular/fire/firestore';
import { getBlob, getStorage, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { getDownloadURL } from 'firebase/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  photoRef: DatabasePhotoRef[];
  constructor(
    private db: Firestore,
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) {}

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });

    // console.log(image);

    //upload to firebase try storage for this
    this.uploadImage(image);
  }

  async uploadImage(cameraFile: Photo) {
    const user = getAuth().currentUser.email;
    //substring(29) is for localhost
    const fileName = cameraFile.webPath.substring(29);
    const photoPath = `uploads/${user}/${fileName}.png`;
    const storageRef = ref(getStorage(), photoPath);
    const response = await fetch(cameraFile.webPath);
    const blob = await response.blob();//we will upload the blob

    await uploadBytes(storageRef, blob)
      .then((snapshot) => {
        console.log('photo uploaded', snapshot.ref);
        // add the image to the user's photos collection
        const photoRef = doc(
          this.firestore,
          `photos/${user}/images/${fileName}`
        );
        const photoToAdd: DatabasePhotoRef = {
          path: fileName,
        };
        setDoc(photoRef, photoToAdd);
      })
      .catch((error) => {
        console.error('Console logged an error: ', error);
      });
  }
  //
  getPhotos(): Observable<DatabasePhotoRef[]> {
    //get the reference to the file name from firestore
    //path to the photo name in firestore
    const firestorePhotoRef = collection(this.firestore, `photos/${getAuth().currentUser.email}/images`);
    console.log('photos fetched');
    return collectionData(firestorePhotoRef) as Observable<DatabasePhotoRef[]>;
  }

  getPhotoFiles(photoList: DatabasePhotoRef[]){
    const gsReference = `gs://explore-users.appspot.com/uploads/${getAuth().currentUser.email}`;
    console.log('photos: ', photoList);
    //now we need to create a reference to that image in firestore db we should loop
    let i = 0;
    for(i = 0; i < photoList.length; i++){
      const storageRefPhoto = ref(getStorage(), `uploads/${getAuth().currentUser.email}/${photoList[i].path}.png`);
      getBlob(storageRefPhoto)
      .then((url) => {
        console.log(i + ' ' + url.text);
      }).catch((err) => {
        console.log('err ->', err);
      });
    }
    //  //create google cloud uri ref
    //  const gsRef = ref(storage, `gs://explore-users.appspot.com/uploads/${user}`);
    //  // add gsRef to update the document of userphotos/ make user photos
  }
}
export interface DatabasePhotoRef {
  path: string;
  //put extra data here such as coords etc.
}
