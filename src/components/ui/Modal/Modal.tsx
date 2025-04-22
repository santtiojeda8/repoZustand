
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { tareaStore } from '../../../store/tareaStore'
import styles from './Modal.module.css'
import { ITarea } from '../../../types/ITarea'
import { useTareas } from '../../../hooks/useTareas'

type IModal = {
    handleCloseModal : VoidFunction
}

const initialState : ITarea = {
    titulo : "",
    descripcion : "" ,
    fechaLimite : ""
}

export const Modal : FC<IModal>= ( {handleCloseModal} ) => {

    const setTareaActiva = tareaStore( (state) => state.setTareaActiva )

    const {createTarea , putTarea} = useTareas()

    const tareaActiva = tareaStore( (state) => state.tareaActiva)

    const [formValues, setFormValues] = useState<ITarea>(initialState)

    useEffect( () => {
        if(tareaActiva) setFormValues(tareaActiva)
    },[])

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name , value} = e.target
        setFormValues( (prev) => ({...prev , [`${name}`]:value}))
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
        if(tareaActiva) {
            putTarea(formValues)
        }else{
            createTarea({...formValues , id: new Date().toDateString() }) // Se genera un ID en base a la fecha
        }
        setTareaActiva(null)
        handleCloseModal() 
    }

  return (
    <div className={styles.containerPrincipalModal}>
        <div className={styles.contentPopUp}>
        <div>
            <h3> {tareaActiva ? "Editar Tarea" : "Crear Tarea"}</h3>
        </div>
        <form onSubmit={handleSubmit} className={styles.formContent}>
            <div>
            <input placeholder="Ingrese titulo" type="text" required autoComplete='off' name='titulo' value={formValues.titulo} onChange={handleChange}/>
            <textarea placeholder='Ingrese descrpcion' name="descripcion" required value={formValues.descripcion} onChange={handleChange}/>
            <input type="date" required autoComplete='off' name='fechaLimite' value={formValues.fechaLimite} onChange={handleChange}/>
            </div>
            <div className={styles.buttonCard}>
                <button onClick={handleCloseModal}>Cancelar</button>
                <button type='submit'>
                    {tareaActiva ? "Editar Tarea" : "Crear Tarea"}
                </button>
            </div>
        </form>
        </div>
    </div>
  )
}
