import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotosPageRoutingModule } from './photos-routing.module';

import { PhotosPage } from './photos.page';

import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [
    GoogleMapsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PhotosPageRoutingModule
  ],
  declarations: [PhotosPage]
})
export class PhotosPageModule {}
