import React from 'react'
import s from "../Select/Select.module.css";

export default function Select({sortElements}) {
    return (
        <div>
            <select className={s.select} name="select" id="" onChange={ (e) => sortElements(e)}>
                <option defaultValue={'all'}>All</option>
                <option value="asc" >Ascendente</option>
                <option value="desc">Descendente</option>
            </select>
        </div>
    )
}
