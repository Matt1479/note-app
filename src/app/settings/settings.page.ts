import { Component, OnInit } from '@angular/core';
import { IonToggle } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ThemeService } from '../services/theme.service';
import { State } from '../store/app.reducer';
import { applyDarkTheme, applyLightTheme } from './store/settings.actions';
import { selectTheme } from './store/settings.selector';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public theme$: Observable<string>;
  prefersDark: MediaQueryList;

  constructor(
    private store: Store<State>,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.prefersDark = this.themeService.prefersDark;

    this.theme$ = this.store.pipe(select(selectTheme));
  }

  onChange(e) {
    if (e.detail.value === 'dark') {
      this.store.dispatch(applyDarkTheme());
    } else {
      this.store.dispatch(applyLightTheme());
    }
  }
}
