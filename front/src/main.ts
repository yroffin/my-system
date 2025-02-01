import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ApplicationRef } from '@angular/core';

bootstrapApplication(AppComponent, appConfig)
  .then((app: ApplicationRef) => {
  })
  .catch((err) => console.error(err));
