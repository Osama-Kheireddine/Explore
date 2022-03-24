import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailedReviewPageRoutingModule } from './detailed-review-routing.module';

import { DetailedReviewPage } from './detailed-review.page';

import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [
    CommonModule,
    GoogleMapsModule,
    FormsModule,
    IonicModule,
    DetailedReviewPageRoutingModule
  ],
  declarations: [DetailedReviewPage]
})
export class DetailedReviewPageModule {}
