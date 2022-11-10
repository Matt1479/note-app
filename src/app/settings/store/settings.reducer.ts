import { State as AppState } from 'src/app/store/app.reducer';
import { createReducer, on } from '@ngrx/store';
import { applyDarkTheme, applyLightTheme } from './settings.actions';
import { Theme as Theme } from '../settings.model';

export interface SettingsState {
  theme: string;
}

export const settingsFeatureKey = 'settings';

export interface State extends AppState {
  settings: SettingsState;
}

const settingsInitialState: SettingsState = {
  theme: 'default',
};

export const settingsReducer = createReducer(
  settingsInitialState,
  on(applyDarkTheme, (state, payload) => ({
    ...state,
    theme: Theme.dark,
  })),
  on(applyLightTheme, (state, payload) => ({
    ...state,
    theme: Theme.light,
  }))
);
