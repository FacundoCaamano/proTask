import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../service/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  @Input() task!:Task
  @Output() editTask = new EventEmitter()
  constructor(private taskService:TaskService, private router:Router) {}
  ngOnInit(): void {
    this.setFormValues()
  }
  categorias =[
    'Compras',
    'Trabajo',
    'Casa',
    'Otros',
  ]
  controlTiutlo = new FormControl<string | null>('',Validators.required)
  controlDescripcion = new FormControl<string | null>('',Validators.required)
  controlPrioridad = new FormControl<string | null>('',Validators.required)
  controlCategoria = new FormControl<string | null>('',Validators.required)

  taskFormEdit = new FormGroup({
    titulo: this.controlTiutlo,
    descripcion: this.controlDescripcion,
    prioridad: this.controlPrioridad,
    categoria: this.controlCategoria,
  })

  setFormValues(){
    this.controlTiutlo.setValue(this.task.titulo)
    this.controlDescripcion.setValue(this.task.descripcion)
    this.controlPrioridad.setValue(this.task.prioridad)
    this.controlCategoria.setValue(this.task.categoria)
  }

  onSubmit(){
    console.log( this.taskFormEdit.value);
    const data = {
      ...this.taskFormEdit.value,
      estado: "Pendiente" 
    }
  
    this.editTask.emit(data)
      
  }
  
}
