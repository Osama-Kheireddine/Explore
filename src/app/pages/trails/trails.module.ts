import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrailsPageRoutingModule } from './trails-routing.module';

import { TrailsPage } from './trails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrailsPageRoutingModule
  ],
  declarations: [TrailsPage]
})
export class TrailsPageModule {}
