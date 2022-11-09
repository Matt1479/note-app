import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { StoreModule } from '@ngrx/store';
import { settingsFeatureKey, settingsReducer } from './store/settings.reducer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsPageRoutingModule,
    StoreModule.forFeature(settingsFeatureKey, settingsReducer),
  ],
  declarations: [SettingsPage],
})
export class SettingsPageModule {}
