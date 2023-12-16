import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './dashboard/components/navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './dashboard/components/footer/footer.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CreateTaskComponent } from './dashboard/pages/task/create-task/create-task.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { TasksComponent } from './dashboard/pages/task/tasks-list/tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskDetailComponent } from './dashboard/pages/task/task-detail/task-detail.component';
import { EditTaskComponent } from './dashboard/pages/task/task-detail/edit-task/edit-task.component';



@NgModule({
  declarations: [
    NavbarComponent,
    DashboardComponent,
    FooterComponent,
    TasksComponent,
    CreateTaskComponent,
    HomeComponent,
    TaskDetailComponent,
    EditTaskComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
