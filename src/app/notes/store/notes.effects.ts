import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotesService } from '../notes.service';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
  loadNotesFailure,
  loadNotesSuccess,
  NotesActionType,
} from './notes.actions';
import { Note } from '../note.model';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class NotesEffects {
  getNotes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NotesActionType.loadNotes),
      mergeMap(() => {
        return this.service.loadNotes().pipe(
          map((notes: Note[]) => loadNotesSuccess({ notes })),
          catchError((error) => of(loadNotesFailure({ error })))
        );
      })
    );
  });

  // deleteNoteById$ = createEffect(() => {})

  constructor(private service: NotesService, private actions$: Actions) {}
}
