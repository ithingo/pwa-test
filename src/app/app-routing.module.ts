import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'celestial', loadChildren: './modules/celestial/celestial.module#CelestialModule' },
  { path: '**', redirectTo: 'celestial' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }