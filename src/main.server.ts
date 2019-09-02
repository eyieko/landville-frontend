import { enableProdMode } from '@angular/core';
import { environment } from 'src/environments/environment';

if (environment.production) {
  enableProdMode();
}

export { AppServerModule } from 'src/app/app.server.module';
export { ngExpressEngine } from '@nguniversal/express-engine';
export { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

