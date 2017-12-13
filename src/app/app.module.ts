import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HealthformComponent } from './healthform/healthform.component';
import { PolicyholderdetailsComponent } from './healthform/policyholderdetails/policyholderdetails.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HealthformComponent,
    PolicyholderdetailsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'mic-app'}),
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

