import { State as AppState } from 'src/app/store/app.reducer';
import { createReducer, on } from '@ngrx/store';
import { LoadingStatus } from 'src/app/models/loadingStatus.enum';
import { Note } from '../note.model';
import {
  addNote,
  addToFavorites,
  deleteNoteById,
  loadFavorites,
  loadNotesFailure,
  loadNotesSuccess,
  removeFromFavorites,
  updateNote,
} from './notes.actions';

export interface NotesState {
  notes: Note[];
  favorites: Note[];
  notesLoaded: LoadingStatus;
  error: any;
}

export const notesFeatureKey = 'notes';

export interface State extends AppState {
  notes: NotesState;
}

const notesInitialState: NotesState = {
  notes: [],
  favorites: [],
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
    notesLoaded: LoadingStatus.failedToLoad,
    error: payload.error,
  })),
  on(deleteNoteById, (state, payload) => ({
    ...state,
    notes: state.notes.filter((note, index) => {
      return note.id !== payload.id;
    }),
  })),
  on(addNote, (state, payload) => ({
    ...state,
    notes: [...state.notes, payload.note],
  })),
  on(updateNote, (state, payload) => ({
    ...state,
    notes: [
      ...state.notes.map((note, index) =>
        note.id === payload.note.id
          ? {
              id: payload.note.id,
              title: payload.note.title,
              content: payload.note.content,
            }
          : note
      ),
    ],
  })),
  on(addToFavorites, (state, payload) => ({
    ...state,
    favorites: [...state.favorites, payload.note],
  })),
  on(removeFromFavorites, (state, payload) => ({
    ...state,
    favorites: state.favorites.filter((note, index) => {
      return note.id !== payload.note.id;
    }),
  })),

  on(loadFavorites, (state, payload) => ({
    ...state,
    favorites: payload.favorites,
    error: null,
  }))
);
