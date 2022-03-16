import { Component, OnInit } from '@angular/core';
import { DatabasePhotoRef, PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage {
  imagePath: any;
  photoRef: DatabasePhotoRef[];
  constructor(private photo: PhotoService) {}

  async takePhoto(){
    return this.imagePath = await this.photo.takePhoto();
  }

  async getPhotos(){
    await this.photo.getPhotos().subscribe((res) =>{
      //Result works, now pass that result to get the files in firebase storage!
      this.photo.getPhotoFiles(res);
    });
  }
}
