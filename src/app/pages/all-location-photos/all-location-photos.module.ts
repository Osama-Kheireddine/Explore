import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllLocationPhotosPageRoutingModule } from './all-location-photos-routing.module';

import { AllLocationPhotosPage } from './all-location-photos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllLocationPhotosPageRoutingModule
  ],
  declarations: [AllLocationPhotosPage]
})
export class AllLocationPhotosPageModule {}
