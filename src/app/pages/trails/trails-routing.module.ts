import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrailsPage } from './trails.page';

const routes: Routes = [
  {
    path: '',
    component: TrailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrailsPageRoutingModule {}
