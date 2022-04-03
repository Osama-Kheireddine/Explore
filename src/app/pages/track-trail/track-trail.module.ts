import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackTrailPageRoutingModule } from './track-trail-routing.module';

import { TrackTrailPage } from './track-trail.page';

import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [
    GoogleMapsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    TrackTrailPageRoutingModule
  ],
  declarations: [TrackTrailPage]
})
export class TrackTrailPageModule {}
