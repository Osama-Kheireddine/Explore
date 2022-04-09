import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllLocationTrailsPageRoutingModule } from './all-location-trails-routing.module';

import { AllLocationTrailsPage } from './all-location-trails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllLocationTrailsPageRoutingModule
  ],
  declarations: [AllLocationTrailsPage]
})
export class AllLocationTrailsPageModule {}
