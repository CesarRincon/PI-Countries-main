import React from 'react'
import s from '../CardsFlag/CardFlag.module.css'
import { Link } from "react-router-dom";

export default function CardFlag(p) {
    return (
        <div className={s.container}>
            <img className={s.imageFlag} src={p.flag} alt="" />
            <div className={s.textDescription}>
                <label>Nombre: {p.name}</label>
                <label>Continente: {p.continente}</label>
            </div>

            <Link to={`/countries/${p.id}`}><button className={s.button}>Ver más</button></Link>

        </div>
    )
}
