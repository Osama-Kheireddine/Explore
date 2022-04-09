import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-all-reviews',
  templateUrl: './view-all-reviews.page.html',
  styleUrls: ['./view-all-reviews.page.scss'],
})
export class ViewAllReviewsPage implements OnInit {
  @Input() latLong: any; placeNameForHeader: any;
  constructor() { }

  ngOnInit() {
    console.log(this.latLong);

  }

}
