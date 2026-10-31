import 'zone.js'; 
import { ApplicationConfig, provideZoneChangeDetection  } from '@angular/core';
//import { ApplicationConfig  } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
//import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

const jwtInterceptor = (req: any, next: any) => {
  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbmlzdHJhZG9yIiwibmFtZSI6IkVzdHVkaWFudGUiLCJyb2xlIjoiVVNVQVJJT19QUkFDVElDQSJ9.c2VjcmV0LWtleS1zaW11bGFkby0yMDI2';
  //'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbmlzdHJhZG9yIiwibmFtZSI6IkVzdHVkaWFudGUiLCJyb2xlIjoiVVNVQVJJT19QUkFDVElDQSJ9.c2VjcmV0LWtleS1zaW11bGFkby0yMDI2';
  
  // Clonamos la petición original e inyectamos el encabezado Authorization de forma transparente
  const authReq = req.clone({
    setHeaders: {
      Authorization: token
    }
  });
  
  return next(authReq);
};

export const appConfig: ApplicationConfig = {
  providers: [
    //provideExperimentalZonelessChangeDetection(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    //provideBrowserGlobalErrorListeners(),
    provideRouter(routes), //provideClientHydration(),
    provideHttpClient(
      withInterceptors([jwtInterceptor])
    )
  ]
};