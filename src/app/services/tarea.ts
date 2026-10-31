import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tarea {
  id?: number;
  titulo: string;
  descripcion: string;
  fechaCreacion?: string;
}

@Injectable({
  providedIn: 'root'
})
/*@Service()
export class Tarea {}*/
export class TareaService {
  private apiUrl = 'http://localhost:8080/api/tareas';
  
  // Encabezado con el token JWT simulado requerido por el Backend
  private headers = new HttpHeaders({
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhcHAtZ2VzdG9yVGFyZWFzIiwibmFtZSI6Ik9saXZlciBDVCIsImFkbWluIjp0cnVlLCJpYXQiOjE1MTYyMzkwMjJ9._XDbSS6HxxJjjoT4mAw0iOUI8SScrEaQfNxpMfIklBU'
  });

  constructor(private http: HttpClient) {}

  getTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl, { headers: this.headers });
  }

  crearTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(this.apiUrl, tarea, { headers: this.headers });
  }

  actualizarTarea(id: number, tarea: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.apiUrl}/${id}`, tarea, { headers: this.headers });
  }

  eliminarTarea(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
}