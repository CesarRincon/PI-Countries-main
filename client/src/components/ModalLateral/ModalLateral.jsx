import React from 'react'
import s from '../ModalLateral/ModalLateral.module.css';
import check from '../../image/check.gif'

export default function ModalLateral({active}) {
    return (
        <div className={active ? s.container : s.oculto}>
            <img src={check} className={s.image} alt="check" />
            <div className={s.containerText}>
                <h1>Success</h1>
                <p>Eliminado exitosamente!</p>
            </div>
        </div>

    )
}
