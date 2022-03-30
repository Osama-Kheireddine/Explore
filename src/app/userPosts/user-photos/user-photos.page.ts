import { Component, OnInit } from '@angular/core';
import { DatabasePhotoRef, PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-user-photos',
  templateUrl: './user-photos.page.html',
  styleUrls: ['./user-photos.page.scss'],
})
export class UserPhotosPage implements OnInit {
  images: DatabasePhotoRef[];
  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.photoService.getPhotos().subscribe((res: DatabasePhotoRef[]) => {
      console.log('fetching photos: ' + res[0].path);
      this.images = res;
    });
  }

}
