import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/store/app.reducer';
import { Note } from '../note.model';
import { addToFavorites, removeFromFavorites } from '../store/notes.actions';
import { selectFavorites, selectNotes } from '../store/notes.selector';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public noteId: string;
  note: Note;
  fav = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<State>,
    private router: Router
  ) {}

  ngOnInit() {
    this.noteId = this.activatedRoute.snapshot.params.noteId;

    this.store.pipe(select(selectNotes)).subscribe((n) => {
      n.find((note, index) => {
        if (n[index].id === this.noteId) {
          this.note = n[index];
        }
        return n[index].id === this.noteId;
      });
    });

    this.store.pipe(select(selectFavorites)).subscribe((favorites) => {
      const favFound = favorites.find((favNote, index) => {
        return favNote.id === this.note.id;
      });

      this.fav = !!favFound;
    });
  }

  onEditNote() {
    this.router.navigate(['/notes/edit/' + this.noteId]);
  }

  onFavorite() {
    // this.fav = !this.fav;
    if (!this.fav) {
      this.store.dispatch(addToFavorites({ note: this.note }));
    } else {
      this.store.dispatch(removeFromFavorites({ note: this.note }));
    }
  }
}
