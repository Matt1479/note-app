import { Action, ActionReducerMap, createReducer, on } from '@ngrx/store';

export interface State {
  theme: string;
  mode: string;
  fontSize: number;
}

export const reducers: ActionReducerMap<State> = {
  theme: createReducer<string, Action>(
    'mainTheme'
    // on(applyTheme)
  ),
  mode: createReducer<string, Action>(
    'dark'
    // on(applyTheme)
  ),
  fontSize: createReducer<number, Action>(
    16
    // on(applyTheme)
  ),
};
