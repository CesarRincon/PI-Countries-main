import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from "../../redux/actions/index";
import Nav from '../../components/Nav/Nav';
import s from '../CardDetail/CardDetail.module.css'
import Loading from '../Loading/Loading';

export default function CardDetail(props) {

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const stateDetail = useSelector((state) => state.countryDetail)
  
  useEffect(() => {
    const id = props.match.params.id;
    setIsLoading(true)
    dispatch(actions.getCountrieDetail(id))
    setIsLoading(false)
  }, [dispatch])

  if (isLoading) return <Loading />

  return (
    <>
      <Nav />
      <div className={s.container}>
        <div className={s.containerImage}>
          <img className={s.image} src={stateDetail.flag} alt="" />
          <div className={s.title}>
            <h1>{stateDetail.name}</h1>
            <span>( {stateDetail.id} )</span>
          </div>
        </div>
        <div className={s.containerDescription}>
          <div className={s.description}>
            <h2>Descripción</h2>
            <span>Capital: {stateDetail.capital}</span><br />
            <span>Subregión: {stateDetail.subregion}</span><br />
            <span>Área: {stateDetail.area} Km²</span><br />
            <span>Población: {stateDetail.poblacion}</span>
          </div>
          <section className={s.actividadTuristica}>
            <h2>Actividades turisticas</h2>
            <table className={s.table}>
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Dificultad</th>
                  <th scope="col">Duración</th>
                  <th scope="col">Temporada</th>
                </tr>
              </thead>
              <tbody>
                
                {stateDetail.activities?.map((a) => {
                  return (
                    <tr className={s.textoAct}>
                      <td>{a.name}</td>
                      <td>{a.difficulty}</td>
                      <td>{a.duration}</td>
                      <td>{a.season}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>


          </section>
        </div>
      </div>
    </>
  )
}
