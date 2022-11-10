import { Component, OnInit } from '@angular/core';
import { IonToggle } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ThemeService } from '../services/theme.service';
import { State } from '../store/app.reducer';
import { applyDarkTheme, applyLightTheme } from './store/settings.actions';
import { selectTheme } from './store/settings.selector';

import { Preferences } from '@capacitor/preferences';
import { Theme } from './settings.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public theme$: Observable<string>;
  prefersDark: MediaQueryList;
  currentTheme: Theme;

  constructor(
    private store: Store<State>,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.prefersDark = this.themeService.prefersDark;

    this.theme$ = this.store.pipe(select(selectTheme));

    Preferences.get({ key: 'theme' }).then((theme) => {
      this.currentTheme = JSON.parse(theme.value).theme as Theme;
    });
  }

  onChange(e) {
    if (e.detail.value === Theme.dark) {
      this.setThemeKey(Theme.dark);
      this.store.dispatch(applyDarkTheme());
    } else {
      this.setThemeKey(Theme.light);
      this.store.dispatch(applyLightTheme());
    }
  }

  setThemeKey(theme: Theme) {
    Preferences.clear();
    Preferences.set({
      key: 'theme',
      value: JSON.stringify({
        theme: theme,
      }),
    }).then();
  }
}
