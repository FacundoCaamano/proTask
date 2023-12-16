import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, mergeMap, take } from 'rxjs';
import { CreateTask, Task, UpdatedTask } from '../models';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiUrl = "https://api-administrador-de-tareas.vercel.app/api/tareas"

  private _tasks$ = new BehaviorSubject<Task[]>([])
  private tasks$ = this._tasks$.asObservable()

  constructor(private http: HttpClient) { }

  loadTasks():void{
    this.http.get<Task[]>(this.apiUrl).subscribe({
      next:(data)=>{
         this._tasks$.next(data)
      }
    })
  }

  getTask(){
    return this.tasks$
  }

  createTask(task:any){
    this.http.post<Task>(this.apiUrl,task).pipe(
      mergeMap((taskCreate)=> this.tasks$.pipe(
        take(1),
        map(
          (arrayActual)=>[...arrayActual,taskCreate ]
        )
      ))
    ).subscribe({
      next:(data)=>this._tasks$.next(data)
    })
  }

  deleteTask(id:number){
    this.http.delete<Task>(this.apiUrl +"/"+ id).pipe(
      mergeMap(()=> this.tasks$.pipe(
        take(1),
        map(
          (arrayActual)=> arrayActual.filter((task)=> task.id !== id)
        )
      ))
    ).subscribe({
      next:(data)=>this._tasks$.next(data)
    })
  }

  updateById(id:number, task:UpdatedTask){
    this.http.put<Task>(this.apiUrl +"/"+ id,task).subscribe({
      next:(data)=>{
        this.loadTasks()
      }
    })
  }
  getById(id: number) {
    return this.http.get<Task>(this.apiUrl +"/"+ id);
  }
}
