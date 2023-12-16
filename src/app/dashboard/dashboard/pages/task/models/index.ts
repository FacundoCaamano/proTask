
export interface Task {
    titulo: string,
    descripcion: string,
    prioridad: Prioridad,
    categoria: string,
    estado: Estado,
    fecha: string,
    id: number
}

export type CreateTask = Omit<Task, 'id' | 'fecha' | 'estado'>
export type UpdatedTask = Omit<Task, 'id' | 'fecha'>

type Prioridad = 'Alta' | 'Media' | 'Baja';
type Estado = 'Pendiente' | 'En progreso' | 'Completada'