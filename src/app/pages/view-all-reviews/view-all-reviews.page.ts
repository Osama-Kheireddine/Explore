import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllLocationPhotosPage } from '../all-location-photos/all-location-photos.page';
import { AllLocationReviewsPage } from '../all-location-reviews/all-location-reviews.page';
import { AllLocationTrailsPage } from '../all-location-trails/all-location-trails.page';

@Component({
  selector: 'app-view-all-reviews',
  templateUrl: './view-all-reviews.page.html',
  styleUrls: ['./view-all-reviews.page.scss'],
})
export class ViewAllReviewsPage implements OnInit {
  @Input() latLong: any;
  placeNameForHeader: any;
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async openModal(selection: string) {
    const latLng = this.latLong;
    //MODAL:
    if (selection === 'photos') {
      const modal = await this.modalController.create({
        component: AllLocationPhotosPage,
        componentProps: {
          latLong: latLng,
          placeNameForHeader: this.placeNameForHeader,
        },
      });
      return await modal.present();
    }
    if (selection === 'reviews') {
      const modal = await this.modalController.create({
        component: AllLocationReviewsPage,
        componentProps: {
          latLong: latLng,
          placeNameForHeader: this.placeNameForHeader,
        },
      });
      return await modal.present();
    }
    if (selection === 'trails') {
      const modal = await this.modalController.create({
        component: AllLocationTrailsPage,
        componentProps: {
          latLong: latLng,
          placeNameForHeader: this.placeNameForHeader,
        },
      });
      return await modal.present();
    }
  }
}
