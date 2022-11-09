import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { State } from 'src/app/store/app.reducer';
import { Note } from '../note.model';
import { updateNote } from '../store/notes.actions';
import { selectNotes } from '../store/notes.selector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  public noteId: string;
  editNoteForm: FormGroup;
  editingNote: Note;

  constructor(
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private activatedRoute: ActivatedRoute,
    private store: Store<State>,
    private router: Router
  ) {}

  ngOnInit() {
    this.noteId = this.activatedRoute.snapshot.params.noteId;

    this.store.pipe(select(selectNotes)).subscribe((n) => {
      n.find((note, index) => {
        if (n[index].id === this.noteId) {
          this.editingNote = n[index];
        }
        return n[index].id === this.noteId;
      });
    });

    this.editNoteForm = this.formBuilder.group({
      title: [this.editingNote.title, [Validators.required]],
      content: [this.editingNote.content, [Validators.required]],
    });
  }

  onConfirm() {
    if (!this.editNoteForm.valid) {
      this.alertCtrl
        .create({
          message: 'Could not edit a note, please provide a title/description',
          buttons: ['Okay'],
        })
        .then((a) => a.present());
      return;
    }

    const newNote: Note = {
      id: this.noteId,
      title: this.editNoteForm.controls.title.value,
      content: this.editNoteForm.controls.content.value,
    };

    this.store.dispatch(updateNote({ note: newNote }));

    this.router.navigate(['/notes/list']);
  }
}
