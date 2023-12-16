import { Component, OnInit } from '@angular/core';
import { Task } from '../models';
import { Observable } from 'rxjs';
import { TaskService } from '../service/task.service';
import { NotifierService } from 'src/app/core/service/notifier.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
   tasks?: Observable<Task[]>
   isMobile: boolean = false
   isLoading:boolean=true
  constructor(private taskService:TaskService, private notifierService:NotifierService) {
    this.isMobile = window.innerWidth < 800
    console.log(this.isMobile);
    
  }
  ngOnInit(): void {
    this.taskService.loadTasks()
    this.tasks = this.taskService.getTask()
    setTimeout(()=>{
      
      if(this.tasks){
        this.isLoading =  false
      }
    },500)
  }

  deleteTask(id:number){
    try{
      this.taskService.deleteTask(id)
      this.notifierService.success("Bien","La tarea se elimino exitosamente")
    }catch{
      this.notifierService.error("Error","No se pudo eliminar la tarea")
    }
  }
}
