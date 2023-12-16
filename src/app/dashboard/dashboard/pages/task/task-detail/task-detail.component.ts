import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../service/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit, OnDestroy {
  public task: Task | undefined;
  public taskId: any ;
  public isLoading:boolean = true
  private subscription:Subscription | undefined
  constructor(
    private taskService: TaskService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
      this.taskId = Number(this.activatedRoute.snapshot.params['id']);
      this.loadTask()     
  }
  
  loadTask(){
    this.subscription= this.taskService.getById(this.taskId).subscribe(task => {
      if(task){
        this.task = task;
        this.isLoading =  false
      }
      else{
        this.isLoading =  false
      }
    });
    
  }
}