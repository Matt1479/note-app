import { createFeatureSelector, createSelector } from '@ngrx/store';
import { notesFeatureKey, NotesState } from './notes.reducer';

export const selectNotesState =
  createFeatureSelector<NotesState>(notesFeatureKey);

export const selectNotes = createSelector(
  selectNotesState,
  (state: NotesState) => state.notes
);

export const notesLoading = createSelector(
  selectNotesState,
  (state: NotesState) => state.notesLoaded
);
