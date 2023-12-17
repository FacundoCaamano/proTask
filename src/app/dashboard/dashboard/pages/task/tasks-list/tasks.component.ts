import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../models';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TaskService } from '../service/task.service';
import { NotifierService } from 'src/app/core/service/notifier.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {
  tasks?: Observable<Task[]>
  isMobile: boolean = false
  isLoading: boolean = true

  //categorias$

  //controlFiltro = new FormControl<string | null>('')
  
  formFiltro = new FormGroup({
    //filtro: this.controlFiltro
  })

  private destroy$ = new Subject<void>();

  constructor(private taskService: TaskService, private notifierService: NotifierService) {
    this.isMobile = window.innerWidth < 800
   // this.taskService.loadCategories()
   // this.categorias$ = this.taskService.getCategories()
  }

  ngOnInit(): void {
    this.taskService.loadTasks()
    this.tasks = this.taskService.getTask()
    if (this.tasks) {
      this.isLoading = false;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  deleteTask(id:number){
    try{
      this.taskService.deleteTask(id)
      this.notifierService.success("Bien","La tarea se elimino exitosamente")
    }catch{
      this.notifierService.error("Error","No se pudo eliminar la tarea")
    }
  }
  onSubmitfiltro() {
    const selectedCategory = this.formFiltro.get('filtro')?.value;
    if (selectedCategory) {
      this.taskService.filterTasksByCategory(selectedCategory);
      // Puedes omitir la siguiente línea si prefieres que la lista de tareas se actualice automáticamente
      this.tasks = this.taskService.getTask();
    } else {
      // Si no se selecciona ninguna categoría, carga todas las tareas
      this.taskService.loadTasks();
      this.tasks = this.taskService.getTask();
    }}

   clearTask(){
     this.taskService.loadTasks()
     this.tasks = this.taskService.getTask()
   } 
}
