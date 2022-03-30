import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailedImagePageRoutingModule } from './detailed-image-routing.module';

import { DetailedImagePage } from './detailed-image.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailedImagePageRoutingModule
  ],
  declarations: [DetailedImagePage]
})
export class DetailedImagePageModule {}
