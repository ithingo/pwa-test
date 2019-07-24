import { NgModule } from '@angular/core';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  imports: [
    MDBBootstrapModule.forRoot(),
  ],
  exports: [
    MDBBootstrapModule,
  ],
  providers: [],
})
export class MaterialModule { }