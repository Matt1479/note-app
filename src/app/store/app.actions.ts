import { createAction } from '@ngrx/store';

export enum AppActionType {
  applyDefaultTheme = '[AppActionType] Apply Default Theme',
  // to do: color themes
  applyDefaultMode = '[AppActionType] Apply Default Mode',
  // to do: light and dark modes
  applyDefaultFontSize = '[AppActionType] Apply Default Font Size',
  // to do: smaller/bigger font
}

export const applyDefaultTheme = createAction(AppActionType.applyDefaultMode);
export const applyDefaultMode = createAction(AppActionType.applyDefaultTheme);
export const applyDefaultFontSize = createAction(
  AppActionType.applyDefaultFontSize
);
