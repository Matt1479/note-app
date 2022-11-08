import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public title: string;
  notes = [
    {
      title: 'Note Header',
      date: new Date(),
      thumbnail: '../../../assets/icon/favicon.png',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis, nisl vitae fringilla porttitor, sem eros vestibulum ligula, sit amet sodales ex lectus vel erat. Suspendisse auctor dapibus nunc, sed bibendum ipsum iaculis at. Suspendisse porta magna sit amet lorem efficitur, et pulvinar leo facilisis. Maecenas eget erat volutpat, pretium risus vitae, condimentum elit.',
    },
  ];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.title = params.noteId;
    });
  }
}
