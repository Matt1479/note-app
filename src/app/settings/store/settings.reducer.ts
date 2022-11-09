import { State as AppState } from 'src/app/store/app.reducer';
import { Action, ActionReducerMap, createReducer, on } from '@ngrx/store';

export interface SettingsState {
  theme: string;
  mode: string;
}

export const settingsFeatureKey = 'settings';

export interface State extends AppState {
  settings: SettingsState;
}

const settingsInitialState: SettingsState = {
  theme: 'string',
  mode: '',
};

export const settingsReducer = createReducer(
  settingsInitialState
  // on(apply)
);
