import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
})
export class NotFoundPage implements OnInit {
  constructor(private alertCtrl: AlertController, private router: Router) {}

  ngOnInit() {
    this.alertCtrl
      .create({
        message: 'This page was not found!',
        buttons: [
          {
            text: 'Okay',
            handler: () => this.router.navigate(['/']),
          },
        ],
      })
      .then((alertEl) => alertEl.present());
  }
}
