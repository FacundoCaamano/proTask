import { Component, OnDestroy, OnInit } from '@angular/core';
import { Categoria, Task } from '../models';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TaskService } from '../service/task.service';
import { NotifierService } from 'src/app/core/service/notifier.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks?: Observable<Task[]>
  isMobile: boolean = false
  isLoading: boolean = true
  isLoadingCategories: boolean = true
  categorias?: Observable<Categoria[]>

  constructor(private taskService: TaskService, private notifierService: NotifierService) {
    this.isMobile = window.innerWidth < 800
    this.taskService.loadTasks()
    this.tasks = this.taskService.getTask()
   
  }

  ngOnInit(): void { 
    if (this.tasks) {
      this.isLoading = false;
    }

    setTimeout(() => {
      this.taskService.loadCategories()
      this.categorias = this.taskService.getCategories()
      this.isLoadingCategories = false
    },1000)
  }

  

  deleteTask(id:number){
    try{
      this.taskService.deleteTask(id)
      this.notifierService.success("Bien","La tarea se elimino exitosamente")
    }catch{
      this.notifierService.error("Error","No se pudo eliminar la tarea")
    }
  }
 
  filterTasksByCategory(category: string) {
    this.tasks= this.taskService.filterTasksByCategory(category)
  }
 
  clearFilter(){
    this.taskService.loadTasks()
    this.tasks = this.taskService.getTask()
  }
}
