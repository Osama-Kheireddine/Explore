import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailedUserTrailPage } from './detailed-user-trail.page';

const routes: Routes = [
  {
    path: '',
    component: DetailedUserTrailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailedUserTrailPageRoutingModule {}
