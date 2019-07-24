import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { CelestialRoutingModule } from './celestial-routing.module';

import { CelestialService } from './celestial.service';

import { CelestialItemComponent } from './components/celestial-item/celestial-item.component';
import { CelestialComponent } from './pages/celestial/celestial.component';
import { CelestialEditComponent } from './pages/celestial-edit/celestial-edit.component';
import { CelestialListComponent } from './pages/celestial-list/celestial-list.component';

@NgModule({
  declarations: [
    CelestialItemComponent,

    CelestialComponent,
    CelestialEditComponent,
    CelestialListComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CelestialRoutingModule,
  ],
  providers: [
    CelestialService,
  ]
})
export class CelestialModule { }
