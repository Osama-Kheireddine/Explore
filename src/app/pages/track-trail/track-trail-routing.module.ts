import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackTrailPage } from './track-trail.page';

const routes: Routes = [
  {
    path: '',
    component: TrackTrailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackTrailPageRoutingModule {}
