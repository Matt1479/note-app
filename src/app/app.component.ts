import { Component, OnDestroy, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ThemeService } from './services/theme.service';
import { Theme } from './settings/settings.model';
import {
  applyDarkTheme,
  applyLightTheme,
} from './settings/store/settings.actions';
import { selectSettingsState } from './settings/store/settings.selector';
import { State } from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Notes', url: '/notes/list', icon: 'documents' },
    { title: 'Favorites', url: '/favorites', icon: 'heart' },
    { title: 'Settings', url: '/settings', icon: 'settings' },
  ];

  constructor(
    private store: Store<State>,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .pipe(select(selectSettingsState))
      .subscribe((settings) => {
        switch (settings?.theme) {
          case Theme.dark:
            document.body.classList.remove(Theme.light);
            document.body.classList.add(Theme.dark);
            break;

          case Theme.light:
            document.body.classList.remove(Theme.dark);
            document.body.classList.add(Theme.light);
            break;

          case Theme.default:
            if (this.themeService.prefersDark.matches) {
              this.store.dispatch(applyDarkTheme());
            }
            if (!this.themeService.prefersDark.matches) {
              this.store.dispatch(applyLightTheme());
            }
            break;
        }

        Preferences.get({ key: 'theme' }).then((theme) => {
          if (theme.value === null) {
            if (this.themeService.prefersDark.matches) {
              this.setThemeKey(Theme.dark);
            } else if (!this.themeService.prefersDark.matches) {
              this.setThemeKey(Theme.light);
            }
          }

          const currentTheme = JSON?.parse(theme?.value)?.theme as Theme;

          if (currentTheme === Theme.dark) {
            document.body.classList.remove(Theme.light);
            document.body.classList.add(Theme.dark);
          }
          if (currentTheme === Theme.light) {
            document.body.classList.remove(Theme.dark);
            document.body.classList.add(Theme.light);
          }
        });
      });
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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
