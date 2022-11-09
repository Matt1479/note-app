import { State as AppState } from 'src/app/store/app.reducer';
import { createReducer, on } from '@ngrx/store';
import { LoadingStatus } from 'src/app/models/loadingStatus.enum';
import { Note } from '../note.model';
import {
  addNote,
  deleteNoteById,
  loadNotesFailure,
  loadNotesSuccess,
  updateNote,
} from './notes.actions';

export interface NotesState {
  notes: Note[];
  notesLoaded: LoadingStatus;
  error: any;
}

export const notesFeatureKey = 'notes';

export interface State extends AppState {
  notes: NotesState;
}

const notesInitialState: NotesState = {
  notes: [],
  notesLoaded: LoadingStatus.notLoaded,
  error: null,
};

export const notesReducer = createReducer(
  notesInitialState,
  on(loadNotesSuccess, (state, payload) => ({
    ...state,
    notes: payload.notes,
    notesLoaded: LoadingStatus.loaded,
    error: null,
  })),
  on(loadNotesFailure, (state, payload) => ({
    ...state,
    error: payload.error,
  })),
  on(deleteNoteById, (state, payload) => ({
    ...state,
    notes: state.notes.filter((note, index) => {
      console.log(state);
      return note.id !== payload.id;
    }),
  })),
  // to do
  on(updateNote, (state, payload) => ({
    ...state,
  })),
  on(addNote, (state, payload) => ({
    ...state,
    notes: [...state.notes, payload.note],
  }))
);
