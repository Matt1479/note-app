import { Injectable, OnDestroy, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService implements OnInit, OnDestroy {
  event;

  public prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  constructor() {
    this.event = this.prefersDark.addEventListener('change', () => {});
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.event.clearEventListener();
  }
}
