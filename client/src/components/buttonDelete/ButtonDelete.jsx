import React from 'react'
import s from "../buttonDelete/ButtonDelete.module.css";

export default function ButtonDelete(e) {
  return (
    <div className={s.pais}>
        <p>{e.pais[0].name}</p>
        <div className={s.buttonDelete} onClick={(ps) => e.deleteCountrie(e.c)}>x</div>
    </div>
  )
}
