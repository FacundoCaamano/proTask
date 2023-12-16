import { Component, OnInit } from '@angular/core';
import { Task } from '../models';
import { Observable } from 'rxjs';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
   tasks?: Observable<Task[]>
   isMobile: boolean = false
   isLoading:boolean = true
  constructor(private taskService:TaskService){
    this.isMobile = window.innerWidth < 800
    console.log(this.isMobile);
    
  }
  ngOnInit(): void {
    this.taskService.loadTasks()
    this.tasks = this.taskService.getTask()
    if(this.tasks){
      this.isLoading =  false
    }
  }

  
  deleteTask(id:number){
    this.taskService.deleteTask(id)
  }
 
}
