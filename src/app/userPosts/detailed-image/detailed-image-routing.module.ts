import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailedImagePage } from './detailed-image.page';

const routes: Routes = [
  {
    path: '',
    component: DetailedImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailedImagePageRoutingModule {}
