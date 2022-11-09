import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { NotesPageRoutingModule } from './notes-routing.module';

import { NotesPage } from './notes.page';
import { NotesService } from './notes.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { notesFeatureKey, notesReducer } from './store/notes.reducer';
import { NotesEffects } from './store/notes.effects';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NotesPageRoutingModule,
    StoreModule.forFeature(notesFeatureKey, notesReducer),
    EffectsModule.forFeature([NotesEffects]),
  ],
  declarations: [NotesPage],
  providers: [NotesService],
})
export class NotesPageModule {}
