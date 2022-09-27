import React from 'react'
import { Link } from 'react-router-dom'
import  s  from "../Nav/Nav.module.css";

export default function Nav() {
  return (
    <div className={s.container}>
        <section className={s.containerTitle}>
            <h1 className={s.title}><Link to={'/'}>Countries</Link></h1> 
        </section>
        <ul className={s.items}>
            <li><Link to={'/countries'}>Home</Link></li>
            <li><Link to={'/activities'}>Activities</Link></li>
        </ul>
    </div>
  )
}
