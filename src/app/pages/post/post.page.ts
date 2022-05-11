import { Component, OnInit } from '@angular/core';
import { UserPhoto, PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage {
  constructor(private photo: PhotoService) {}
}
