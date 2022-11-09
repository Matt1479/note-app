import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/app.reducer';
import { Note } from '../note.model';
import { addNote } from '../store/notes.actions';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  newNoteForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private store: Store<State>,
    private router: Router
  ) {}

  ngOnInit() {
    this.newNoteForm = this.formBuilder.group({
      title: [''],
      date: [new Date()],
      content: ['', [Validators.required]],
    });
  }

  onCreateNote() {
    if (!this.newNoteForm.valid) {
      this.alertCtrl
        .create({
          message: 'Could not add a note, please provide a description',
          buttons: ['Okay'],
        })
        .then((a) => a.present());
      return;
    }

    const newNote: Note = {
      id: new Date().getTime().toString(),
      title: this.newNoteForm.controls.title.value,
      date: this.newNoteForm.controls.date.value,
      content: this.newNoteForm.controls.title.value,
    };

    this.store.dispatch(addNote({ note: newNote }));

    this.router.navigate(['/notes/list']);
  }
}
