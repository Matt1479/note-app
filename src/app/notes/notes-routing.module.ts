import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotesPage } from './notes.page';
import { PreloadNotesGuard } from './preload-notes.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/notes/list',
    pathMatch: 'full',
  },
  {
    path: '',
    component: NotesPage,
    canActivate: [PreloadNotesGuard],
    children: [
      // remember - hard coded routes first!
      {
        path: 'list',
        loadChildren: () =>
          import('./list/list.module').then((m) => m.ListPageModule),
      },
      {
        path: 'new',
        loadChildren: () =>
          import('./new/new.module').then((m) => m.NewPageModule),
      },
      {
        path: ':noteId',
        loadChildren: () =>
          import('./detail/detail.module').then((m) => m.DetailPageModule),
      },
      {
        path: 'edit/:noteId',
        loadChildren: () =>
          import('./edit/edit.module').then((m) => m.EditPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesPageRoutingModule {}
