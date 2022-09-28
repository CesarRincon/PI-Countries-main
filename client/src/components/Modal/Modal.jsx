import React from 'react'
import s from '../Modal/Modal.module.css'
import check from '../../image/check.gif'
import err from '../../image/err.png'

export default function Modal({ children, error }) {

    return (
        <div className={s.overlay}>
            <div className={s.modalContainer}>
                <div className={s.encabezado}>
                    <img className={error ? s.imageError : s.imageSuccess} src={error ? err : check} alt={'Imagen de información'}/>
                </div>
                <div className={s.buttonCerrar}>X</div>
                <div className={s.contenido}>
                    {children}
                </div>
            </div>
        </div>
    )
}
