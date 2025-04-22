import { useShallow } from "zustand/shallow"
import { tareaStore } from "../store/tareaStore"
import { editTarea, deleteUnaTarea, getAllTareas, postNuevaTarea } from "../http/tareas"
import { ITarea } from "../types/ITarea"
import Swal from "sweetalert2"


export const useTareas = () => {

    const { tareas , setArrayTareas , agregarNuevaTarea , eliminarTarea , editarTarea}  = tareaStore (useShallow((state) => ({
        tareas : state.tareas ,
        setArrayTareas : state.setArrayTareas ,
        agregarNuevaTarea : state.agregarNuevaTarea ,
        eliminarTarea : state.eliminarTarea ,
        editarTarea : state.editarTarea
    })))

    const getTareas = async () => {
        const data = await getAllTareas()
        if(data) setArrayTareas(data)
    }

    const createTarea = async (nuevaTarea : ITarea)=> {

        agregarNuevaTarea(nuevaTarea)   //Primero se modifica el estado el estado

        try {
            await postNuevaTarea(nuevaTarea)    //Después se modifica la tarea en el back
            Swal.fire("Exito", "Tarea creada correctamente")
        } catch (error) {
            eliminarTarea(nuevaTarea.id!)       //Si algo sale mal en la modioficacion al back, nos tenemos que asegurar de modificar nuevamente el estado de zustand
            console.log("Algo salio mal al crear tabla")
        }
    }

    const putTarea = async (tareaEditada : ITarea) => {

        const tareaPrevia = tareas.find( (el) => el.id == tareaEditada.id)

        editarTarea(tareaEditada)

        try {
            await editTarea(tareaEditada)
            Swal.fire("Exito", "Tarea creada correctamente")
        } catch (error) {
            if (tareaPrevia) editarTarea (tareaPrevia)
            console.log("Hubo un error en la edicion")
        }

    }

    const deleteTarea = async (idTarea:string) => {

        const idPrevio = tareas.find( (el) => el.id === idTarea)

        const confirm = await Swal.fire ({
            title:"Estas seguro?",
            text: "Esta accion no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "si, eliminar",
            cancelButtonText:"Cancelar"
        })

        if(!confirm.isConfirmed) return
        eliminarTarea(idTarea)

        try {
            await deleteUnaTarea(idTarea)
        } catch (error) {
            console.log("Hubo un error al eliminar la tarea")
            if (idPrevio) agregarNuevaTarea(idPrevio)
        }
    }

    return {
        getTareas ,
        createTarea ,
        putTarea ,
        deleteTarea ,
        tareas
    }
}

