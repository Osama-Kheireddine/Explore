import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapTrailModalPage } from './map-trail-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MapTrailModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapTrailModalPageRoutingModule {}
