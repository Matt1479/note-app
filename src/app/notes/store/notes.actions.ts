import { createAction, props } from '@ngrx/store';
import { Note } from '../note.model';

export enum NotesActionType {
  loadNotes = '[NotesActionType] Load Notes',
  loadNotesSuccess = '[NotesActionType] Load Notes Success',
  loadNotesFailure = '[NotesActionType] Load Notes Failure',

  deleteNoteById = '[NotesActionType] Delete Note By Id',

  addNote = '[NotesActionType] Add Note',

  updateNote = '[NotesActionType] Update Note',
}

export const loadNotes = createAction(NotesActionType.loadNotes);
export const loadNotesSuccess = createAction(
  NotesActionType.loadNotesSuccess,
  props<{ notes: Note[] }>()
);
export const loadNotesFailure = createAction(
  NotesActionType.loadNotesFailure,
  props<{ error: any }>()
);

export const deleteNoteById = createAction(
  NotesActionType.deleteNoteById,
  props<{ id: string }>()
);

export const addNote = createAction(
  NotesActionType.addNote,
  props<{ note: Note }>()
);

export const updateNote = createAction(
  NotesActionType.updateNote,
  props<{ note: Note }>()
);
