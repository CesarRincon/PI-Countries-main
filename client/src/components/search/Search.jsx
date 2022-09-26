import React from 'react'
import s from '../search/Search.module.css'


export default function ({searchCountry}) {

    return (
        <div>
            <input className={s.inputSearch} type="search" name="search" placeholder='Busca por Nombre' onChange={(e) => searchCountry(e)} autoComplete='off'/>
        </div>
    )
}
