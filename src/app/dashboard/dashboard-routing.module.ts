import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateTaskComponent } from './dashboard/pages/task/create-task/create-task.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { TasksComponent } from './dashboard/pages/task/tasks-list/tasks.component';
import { TaskDetailComponent } from './dashboard/pages/task/task-detail/task-detail.component';



@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'home',
      component:HomeComponent
    },
    {
      path: 'tasks',
      component:TasksComponent
    },
    {
      path: 'createtask',
      component:CreateTaskComponent
    },
    {
      path:'detailtask/:id',
      component: TaskDetailComponent
    },
    {
      path:'**',
      redirectTo:'home'
    }
  ])],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
