import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Notes', url: '/notes/list', icon: 'documents' },
    { title: 'Favorites', url: '/favorites', icon: 'heart' },
    { title: 'Settings', url: '/settings', icon: 'settings' },
  ];

  constructor() {}
}
