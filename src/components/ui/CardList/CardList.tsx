import { FC } from 'react'
import { ITarea } from '../../../types/ITarea'
import { useTareas } from '../../../hooks/useTareas'
import styles from "./CardList.module.css"

type ICardList = {
    tarea:ITarea
    handleOpenModalEdit : (tarea:ITarea) => void
}


export const CardList : FC<ICardList> = ( {tarea , handleOpenModalEdit} ) => {

    const {deleteTarea} = useTareas()

    const deleteTareaById = () => {
        if(tarea.id){
            deleteTarea(tarea.id)
        }
    }

    const editarTarea = () => {
        handleOpenModalEdit(tarea)
        console.log("Editar " , tarea)
    }

  return (
    <div className={styles.containerCard}>
        <div>
            <h3>Título : {tarea.titulo}</h3>
            <p>Descripcion : {tarea.descripcion}</p>
            <p>
                <b>Fecha Límite : {tarea.fechaLimite}</b>
            </p>
        </div>
        <div className={styles.actionCard}>
            <button onClick={deleteTareaById}>Eliminar</button>
            <button onClick={editarTarea}>Editar</button>
        </div>
    </div>
  )
}
