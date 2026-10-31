import { Routes } from '@angular/router';
import { TareaComponent } from './components/tarea/tarea';

export const routes: Routes = [
     { path: '', redirectTo: 'tareas', pathMatch: 'full' },
     { path: 'tareas', component: TareaComponent }
];
