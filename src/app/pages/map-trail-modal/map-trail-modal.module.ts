import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapTrailModalPageRoutingModule } from './map-trail-modal-routing.module';

import { MapTrailModalPage } from './map-trail-modal.page';

import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [
    GoogleMapsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MapTrailModalPageRoutingModule
  ],
  declarations: [MapTrailModalPage]
})
export class MapTrailModalPageModule {}
