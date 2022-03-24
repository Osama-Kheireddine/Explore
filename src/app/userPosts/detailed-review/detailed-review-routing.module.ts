import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailedReviewPage } from './detailed-review.page';

const routes: Routes = [
  {
    path: '',
    component: DetailedReviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailedReviewPageRoutingModule {}
