import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TestServiceService } from './services/test-service.service';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    TestServiceService,
    importProvidersFrom(TestServiceService, HttpClientModule),
    provideClientHydration(),
  ],
};
