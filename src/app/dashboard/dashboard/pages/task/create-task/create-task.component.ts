import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria, CreateTask } from '../models';
import { TaskService } from '../service/task.service';
import { NotifierService } from 'src/app/core/service/notifier.service';
import { Observable, Subscription } from 'rxjs';



@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  controlCrearCategoria: FormControl
  categorias$!: Observable<Categoria[]>
  
  constructor(private formBuilder: FormBuilder, private taskService:TaskService, private notifierService:NotifierService) {
    this.controlCrearCategoria = formBuilder.control('', Validators.required);
   }
  ngOnInit(): void {
    this.taskService.loadCategories()
    this.categorias$ =  this.taskService.getCategories()
   
  }
 
  controlTitulo = new FormControl<string | null>('',Validators.required)
  controlDescripcion = new FormControl<string | null>('',Validators.required)
  controlPrioridad = new FormControl<string | null>('',Validators.required)
  controlCategoria = new FormControl<string | null>('',Validators.required)
  
 

  formTask = new FormGroup({
    titulo: this.controlTitulo,
    descripcion: this.controlDescripcion,
    prioridad: this.controlPrioridad,
    categoria: this.controlCategoria,
  })

  createCategory(){
    if(this.controlCrearCategoria.invalid){
      this.controlCrearCategoria.markAllAsTouched()
    }else{
      const data:Categoria={
        name: this.controlCrearCategoria.value 
      }
      this.taskService.createCategory(data)
    }
  }

  onSubmit(){
    try{
      if(this.formTask.invalid){
        this.formTask.markAllAsTouched()
      }
      else{
        const data = {
          ...this.formTask.value as CreateTask,
          estado: "Pendiente" as string
        }
        this.taskService.createTask(data)
        this.notifierService.success("Bien","La tarea se creo exitosamente")
        this.formTask.reset()
      }
    }catch{
      this.notifierService.error("Error","No se pudo crear la tarea")
    }
  }

  
  
}
