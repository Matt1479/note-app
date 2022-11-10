import { createAction } from '@ngrx/store';

export enum SettingsActionType {
  applyDefaultTheme = '[AppActionType] Apply Default Theme',
  applyDarkTheme = '[AppActionType] Apply Dark Theme',
  applyLightTheme = '[AppActionType] Apply Light Theme',
}

export const applyDefaultTheme = createAction(
  SettingsActionType.applyDefaultTheme
);
export const applyDarkTheme = createAction(SettingsActionType.applyDarkTheme);
export const applyLightTheme = createAction(SettingsActionType.applyLightTheme);
