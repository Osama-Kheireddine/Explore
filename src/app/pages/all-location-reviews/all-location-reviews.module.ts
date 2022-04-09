import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllLocationReviewsPageRoutingModule } from './all-location-reviews-routing.module';

import { AllLocationReviewsPage } from './all-location-reviews.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllLocationReviewsPageRoutingModule
  ],
  declarations: [AllLocationReviewsPage]
})
export class AllLocationReviewsPageModule {}
