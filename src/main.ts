import { enableProdMode, LOCALE_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

if (environment.production) {
  enableProdMode();
}

registerLocaleData(localeDe);

platformBrowserDynamic(
  [{ provide: LOCALE_ID, useValue: 'de-DE' }]
).bootstrapModule(AppModule, {providers: [{provide: LOCALE_ID, useValue: 'de-DE'}]})
  .catch(err => console.error(err));
