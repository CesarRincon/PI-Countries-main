import React from 'react'
import  s  from "../Nav/Nav.module.css";
import { NavLink, Link } from 'react-router-dom';

export default function Nav() {
  return (
    <div className={s.container}>
        <section className={s.containerTitle}>
            <h1 className={s.title}><Link to={'/'}>Countries</Link></h1> 
        </section>
        <ul className={s.items}>
            <li><NavLink activeClassName= { s.active } to={'/countries'}>Home</NavLink></li>
            <li><NavLink activeClassName= { s.active } to={'/activities'}>Activities</NavLink></li>
        </ul>
    </div>
  )
}
