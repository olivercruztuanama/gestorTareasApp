import { Component,OnInit } from '@angular/core';
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

  constructor(private tareaService: TareaService) {}

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas(): void {
    this.tareaService.getTareas().subscribe(res => this.tareas = res);
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
  }
}