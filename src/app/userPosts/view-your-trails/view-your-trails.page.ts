import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TrackingService, Trail } from 'src/app/services/tracking.service';
import { DetailedUserTrailPage } from '../detailed-user-trail/detailed-user-trail.page';

@Component({
  selector: 'app-view-your-trails',
  templateUrl: './view-your-trails.page.html',
  styleUrls: ['./view-your-trails.page.scss'],
})
export class ViewYourTrailsPage implements OnInit {
  trails: Trail[] = [];
  constructor(
    private trailService: TrackingService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    return this.trailService.getUsersTrails().subscribe((res: Trail[])=>{
      this.trails = res;
      // this.trails = this.trails.reverse();
    });
  }

  async openModal(trailPassed: Trail) {
    //MODAL:
    const modal = await this.modalController.create({
      component: DetailedUserTrailPage,
      componentProps: { trail: trailPassed },
    });
    return await modal.present();
  }
}
