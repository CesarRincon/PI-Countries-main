import React from 'react'
import img from '../../image/planeAroundWorld.gif'
import s from '../Loading/Loading.module.css'
import Nav from '../Nav/Nav'

export default function () {
    return (
        <>
            <Nav />
            <div className={s.LoadindContainer}>
                <img className={s.image} src={img} alt="" />
                <p>CARGANDO...</p>
            </div>
        </>
    )
}
