import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllLocationPhotosPage } from './all-location-photos.page';

const routes: Routes = [
  {
    path: '',
    component: AllLocationPhotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllLocationPhotosPageRoutingModule {}
