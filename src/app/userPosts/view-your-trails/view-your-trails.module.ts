import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewYourTrailsPageRoutingModule } from './view-your-trails-routing.module';

import { ViewYourTrailsPage } from './view-your-trails.page';

import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [
    CommonModule,
    GoogleMapsModule,
    FormsModule,
    IonicModule,
    ViewYourTrailsPageRoutingModule
  ],
  declarations: [ViewYourTrailsPage]
})
export class ViewYourTrailsPageModule {}
