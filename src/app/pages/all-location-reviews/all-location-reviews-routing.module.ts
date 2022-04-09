import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllLocationReviewsPage } from './all-location-reviews.page';

const routes: Routes = [
  {
    path: '',
    component: AllLocationReviewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllLocationReviewsPageRoutingModule {}
