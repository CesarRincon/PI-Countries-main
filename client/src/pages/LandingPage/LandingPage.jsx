import React, { useState } from 'react'
import img from '../../image/planeAroundWorld.gif'
import s from '../LandingPage/LandingPage.module.css'
import { Link } from 'react-router-dom';
import Slider from '../../components/Slider/Slider';
import video from '../../image/videobg.mp4'
import ReactPlayer from 'react-player'


export default function LandingPage() {

  const [option, setOption] = useState(false);


  return (
    <div>
      <div className={s.landing}>

        <ReactPlayer url={video} playing={true} muted={true} loop={true} />
        <div className={s.texttitle}>
          <h1>Countries</h1>
        </div>

        {option === false &&
          <section className={s.sect}>
            <p>¿Estas preparado para dar un tour por los paises?</p>
          </section>}
        {option === false &&
          <section className={s.opciones}>
            <span onClick={() => setOption(true)}>Si</span>
            <span onClick={() => setOption(false)}>No</span>
          </section>
        }

        {option === true &&
          <div className={s.contentButton}>
            <button className={s.buttonEntrar}><Link to={'/countries'}>Entrar</Link></button>
          </div>
        }
      </div>
    </div>
  )
}
