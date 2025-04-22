import { create } from "zustand";
import { ITarea } from "../types/ITarea";

interface ITareaStore{
    tareas : ITarea[]
    tareaActiva : ITarea|null
    setTareaActiva: (tareaActiva:ITarea|null)=>void
    setArrayTareas : (arrayDeTareas:ITarea[]) => void
    agregarNuevaTarea : (nuevaTarea: ITarea) => void
    editarTarea : (tareaEditada:ITarea) => void
    eliminarTarea : (idTarea:string) => void
}



export const tareaStore = create <ITareaStore>( (set) => ({
    tareas:[],
    tareaActiva:null,

    //funciones modificadoras para el array

    //agregar arrray de tareas
    setArrayTareas : (arrayDeTareas) => set ( () => ({tareas:arrayDeTareas})),

    //agregar una tarea la array
    agregarNuevaTarea : (nuevaTarea) => set ( (state) => ( {tareas: [ ...state.tareas , nuevaTarea]} )),

    //editar una tarea del array
    editarTarea : (tareaEditada) => set ( (state) => {
        const arregloTareas = state.tareas.map( (tarea) => tarea.id === tareaEditada.id ? {...tarea , ...tareaEditada} : tarea);
        return {tareas : arregloTareas};
    }),
    
    //eliminar una tarea de la array
    eliminarTarea : (idTarea) => set ( (state) => {
        const arregloTareas = state.tareas.filter( (tarea) => tarea.id !== idTarea ) ;
        return {tareas : arregloTareas}
    } ),

    //setear la tarea activa
    setTareaActiva: (tareaActivaIn) => set( () => ({tareaActiva:tareaActivaIn})),

}))
