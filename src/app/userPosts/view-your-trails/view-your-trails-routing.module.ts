import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewYourTrailsPage } from './view-your-trails.page';

const routes: Routes = [
  {
    path: '',
    component: ViewYourTrailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewYourTrailsPageRoutingModule {}
