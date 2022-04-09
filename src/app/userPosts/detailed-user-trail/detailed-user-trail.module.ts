import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailedUserTrailPageRoutingModule } from './detailed-user-trail-routing.module';

import { DetailedUserTrailPage } from './detailed-user-trail.page';

import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoogleMapsModule,
    DetailedUserTrailPageRoutingModule
  ],
  declarations: [DetailedUserTrailPage]
})
export class DetailedUserTrailPageModule {}
