import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, map, mergeMap, take } from 'rxjs';
import { Categoria, CreateTask, Task, UpdatedTask } from '../models';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiUrl = "https://api-administrador-de-tareas.vercel.app/api/tareas"

  private _tasks$ = new BehaviorSubject<Task[]>([])
  private tasks$ = this._tasks$.asObservable()
  private taskUpdated$ = new Subject<Task>();

  private _categorias$ = new BehaviorSubject<Categoria[]>([])
  private categorias$ = this._categorias$.asObservable()
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
    this.http.post<Task>(this.apiUrl,task)
    .pipe(
      mergeMap((taskCreate)=> this.tasks$.pipe(
        take(1),
        map(
          (arrayActual)=>[...arrayActual,taskCreate ]
        )
      )
      )
    )
    .subscribe({
      next:(data)=>{
        this._tasks$.next(data)
      }

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

  updateById(id: number, task: any) {
    this.http.put<Task>(this.apiUrl + "/" + id, task).subscribe({
      next: (data) => {
       
        this.taskUpdated$.next(data); // Emitir evento de actualización
      }
    });
  }

  getTaskUpdated() {
    return this.taskUpdated$.asObservable();
  }
  getById(id: number) {
    return this.http.get<Task>(this.apiUrl +"/"+ id);
  }

  loadCategories():void{
    this.http.get<Categoria[]>(this.apiUrl +"/categorias").subscribe({
      next:(data)=>{
        this._categorias$.next(data)
      }
    })
    
  }

  getCategories(){
    return this.categorias$
  }

  createCategory(categoria:Categoria){
    this.http.post<Categoria>(this.apiUrl +"/categorias",categoria)
    .pipe(
      mergeMap((categoriaCreate)=> this.categorias$.pipe(
        take(1),
        map(
          (arrayActual)=>[...arrayActual,categoriaCreate ]
        )
      ))
    ).subscribe({
      next:(data)=>{
        this._categorias$.next(data)
      }
    })
  }
  

  filterTasksByCategory(category: string) {
    this.http.get<Task[]>(this.apiUrl + "/categoria/" + category).subscribe({
      next: (data) =>  this._tasks$.next(data)
    })
    return this.tasks$
  }
}
