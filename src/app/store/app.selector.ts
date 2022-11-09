import { createFeatureSelector } from '@ngrx/store';
import { State } from './app.reducer';

// prepare selectors
const theme = (state: State) => state.theme;
const mode = (state: State) => state.mode;
const fontSize = (state: State) => state.fontSize;

// create selectors
export const selectTheme = createFeatureSelector('theme');
export const selectMode = createFeatureSelector('mode');
export const selectFontSize = createFeatureSelector('fontSize');
