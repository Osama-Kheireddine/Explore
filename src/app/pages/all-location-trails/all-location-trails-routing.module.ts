import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllLocationTrailsPage } from './all-location-trails.page';

const routes: Routes = [
  {
    path: '',
    component: AllLocationTrailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllLocationTrailsPageRoutingModule {}
