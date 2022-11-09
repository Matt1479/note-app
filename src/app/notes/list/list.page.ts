import { Component, OnInit } from '@angular/core';
import { AlertController, IonItemSliding } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/store/app.reducer';
import { Note } from '../note.model';
import { deleteNoteById } from '../store/notes.actions';
import { selectNotes } from '../store/notes.selector';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  public notes$: Observable<Note[]>;

  constructor(
    private store: Store<State>,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.notes$ = this.store.pipe(select(selectNotes));
  }

  onDeleteNote(noteId: string, slidingItem: IonItemSliding) {
    this.alertCtrl
      .create({
        message: 'Are you sure you want to delete?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              slidingItem.close();
              this.store.dispatch(deleteNoteById({ id: noteId }));
            },
          },
          {
            text: 'No',
            handler: () => slidingItem.close(),
          },
        ],
      })
      .then((alertEl) => alertEl.present());
  }
}
