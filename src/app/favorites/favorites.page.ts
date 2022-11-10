import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Note } from '../notes/note.model';
import { selectFavorites } from '../notes/store/notes.selector';
import { State } from '../store/app.reducer';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favorites: Note[] = [];

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.pipe(select(selectFavorites)).subscribe((favNotes) => {
      this.favorites = favNotes;
    });
  }
}
