import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CelestialComponent } from './pages/celestial/celestial.component';
import { CelestialListComponent } from './pages/celestial-list/celestial-list.component';
import { CelestialEditComponent } from './pages/celestial-edit/celestial-edit.component';


const routes: Routes = [
  {
    path: '', component: CelestialComponent,
    children: [
      { path: 'list', component: CelestialListComponent },
      { path: 'new', component: CelestialEditComponent },
      { path: 'edit/:id', component: CelestialEditComponent },
      { path: '**', redirectTo: 'list' },
    ],
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CelestialRoutingModule { }