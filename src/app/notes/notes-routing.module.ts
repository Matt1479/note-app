import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotesPage } from './notes.page';
import { PreloadNotesGuard } from './preload-notes.guard';

const routes: Routes = [
  {
    path: '',
    component: NotesPage,
    canActivate: [PreloadNotesGuard],
    children: [
      {
        path: 'list',
        loadChildren: () =>
          import('./list/list.module').then((m) => m.ListPageModule),
      },
      {
        path: ':noteId',
        loadChildren: () =>
          import('./detail/detail.module').then((m) => m.DetailPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesPageRoutingModule {}
