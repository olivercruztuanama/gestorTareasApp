import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TareaService, Tarea } from '../../services/tarea';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
/*
@Component({
  imports: [],
  selector: 'app-tarea',
  styleUrl: './tarea.css',
  templateUrl: './tarea.html',
})
export class Tarea {}*/
@Component({
  selector: 'app-tarea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tarea.html',
  styleUrls: ['./tarea.css']
})
export class TareaComponent implements OnInit {
  tareas: Tarea[] = [];
  nuevaTarea: Tarea = { titulo: '', descripcion: '' };
  editando: boolean = false;
  idEditando?: number;

  //constructor(private tareaService: TareaService) {}
  constructor(private tareaService: TareaService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas(): void {
    this.tareaService.getTareas().subscribe({
      next: (res) => {
        this.tareas = res;
        //console.log(this.tareas);
        this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Error al conectar con el servidor backend:', err);
      alert('No se pudo conectar con el servidor. Revisa si el backend está encendido o si el token es válido.');
    }
    });
  }

  guardarTarea(): void {
    if (!this.nuevaTarea.titulo.trim()) return;

    if (this.editando && this.idEditando) {
      this.tareaService.actualizarTarea(this.idEditando, this.nuevaTarea).subscribe(() => {
        this.resetForm();
        this.cargarTareas();
      });
    } else {
      this.tareaService.crearTarea(this.nuevaTarea).subscribe(() => {
        this.resetForm();
        this.cargarTareas();
      });
    }
  }

  editar(tarea: Tarea): void {
    this.editando = true;
    this.idEditando = tarea.id;
    this.nuevaTarea = { titulo: tarea.titulo, descripcion: tarea.descripcion };
    this.cdr.detectChanges();
  }

  borrar(id?: number): void {
    if (id && confirm('¿Seguro que deseas eliminar esta tarea?')) {
      this.tareaService.eliminarTarea(id).subscribe(() => this.cargarTareas());
    }
  }

  resetForm(): void {
    this.editando = false;
    this.idEditando = undefined;
    this.nuevaTarea = { titulo: '', descripcion: '' };
    this.cdr.detectChanges();
  }
}