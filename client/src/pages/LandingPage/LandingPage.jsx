import React from 'react'
import img from '../../image/planeAroundWorld.gif'
import s from '../LandingPage/LandingPage.module.css'
import { Link } from 'react-router-dom';
import Slider from '../../components/Slider/Slider';

export default function LandingPage() {
  return (
    <div className={s.landing}>
      <div className={s.contenedor}>
        <section className={s.title}>
          <h1>Countries</h1>
          <p>Bienvenido a Countries, la pagina web que te dará un pequeño tour por los paises.</p>
          <Slider />
        </section>
        <section className={s.contentImg}>
          <img className={s.img} src={img} alt="" />
          <div className={s.sombra}></div>
        </section>
      </div>
      <div className={s.contentButton}>
        <button className={s.buttonEntrar}><Link to={'/countries'}>Entrar</Link></button>
      </div>

    </div>
  )
}
