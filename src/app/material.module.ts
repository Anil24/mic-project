import { NgModule } from '@angular/core';

import {
  MatGridListModule,
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatChipsModule
} from '@angular/material';

@NgModule({
  imports: [
    MatGridListModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule
  ],
  exports: [
    MatGridListModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule
  ]
})
export class MaterialModule {}