import { createFeatureSelector, createSelector } from '@ngrx/store';
import { settingsFeatureKey, SettingsState } from './settings.reducer';

export const selectSettingsState =
  createFeatureSelector<SettingsState>(settingsFeatureKey);

export const selectTheme = createSelector(
  selectSettingsState,
  (state: SettingsState) => state.theme
);
