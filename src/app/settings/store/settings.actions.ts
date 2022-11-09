import { createAction } from '@ngrx/store';

export enum SettingsActionType {
  applyDefaultTheme = '[AppActionType] Apply Default Theme',
  // to do: color themes
  applyDefaultMode = '[AppActionType] Apply Default Mode',
  // to do: light and dark modes
}

export const applyDefaultTheme = createAction(
  SettingsActionType.applyDefaultMode
);
export const applyDefaultMode = createAction(
  SettingsActionType.applyDefaultTheme
);
