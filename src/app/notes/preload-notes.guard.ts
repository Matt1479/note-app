import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { LoadingStatus } from '../models/loadingStatus.enum';
import { State } from '../store/app.reducer';
import { loadNotes } from './store/notes.actions';
import { NotesState } from './store/notes.reducer';
import { selectNotesState } from './store/notes.selector';

@Injectable({
  providedIn: 'root',
})
export class PreloadNotesGuard implements CanActivate {
  constructor(
    private store: Store<State>,
    private loadingCtrl: LoadingController
  ) {}

  getNotesFromStoreOrApi(): Observable<any> {
    return this.store.select(selectNotesState).pipe(
      tap((state: NotesState) => {
        if (state.notesLoaded === LoadingStatus.notLoaded) {
          this.loader.then((loaderEl) => loaderEl.present());
          this.store.dispatch(loadNotes());
        }
      }),
      filter((state: NotesState) => state.notesLoaded === LoadingStatus.loaded),
      tap((state: NotesState) => {
        if (state.notesLoaded === LoadingStatus.loaded) {
          this.loader.then((loaderEl) => loaderEl.dismiss());
        }
      }),
      take(1)
    );
  }

  canActivate(): Observable<boolean> {
    return this.getNotesFromStoreOrApi().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private loader = this.loadingCtrl.create({
    message: 'Loading notes...',
    cssClass: 'loader',
  });
}
