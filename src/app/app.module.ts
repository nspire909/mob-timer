import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { TimerControlsComponent } from './timer-controls/timer-controls.component';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  declarations: [AppComponent, TimerControlsComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {}
