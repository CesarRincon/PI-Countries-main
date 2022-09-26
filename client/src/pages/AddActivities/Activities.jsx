import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Nav from '../../components/Nav/Nav'
import { validateForm, validateSubmit, resetInput } from '../../controllers/utils'
import s from '../AddActivities/Activities.module.css'
import * as actions from '../../redux/actions/index.js'
import ButtonDelete from '../../components/buttonDelete/ButtonDelete'

export default function Activities() {

  const dispatch = useDispatch();
  const [actividades, setActividades] = useState()

  const activities = useSelector((state) => state.actTuristica);
  const countries = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(actions.getAllCountries())
    dispatch(actions.getActivities())
  }, [dispatch])

  useEffect(() => {
    setActividades(activities)
  }, [dispatch, activities])

  const [inputs, setInputs] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  })

  const [error, setError] = useState({});

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })

    setError(validateForm({ ...inputs, [e.target.name]: e.target.value }))
    console.log(inputs);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    validateSubmit(inputs)
    dispatch(actions.createTouristActivity(inputs));
    setInputs(resetInput())
  }

  const handleChangeCountries = (e) => {
    setInputs({
      ...inputs,
      countries: [...inputs.countries, e.target.value]
    })
  }

  const deleteCountrie = (e) => {
    setInputs({
      ...inputs,
      countries: [...inputs.countries.filter((p) => p !== e)]
    })
  }

  return (
    <div className={s.container}>
      <nav><Nav /></nav>
      <h1>Activities</h1>
      <div className={s.contenedorBody}>
        <div className={s.containerForm}>
          <h3>Crear Actividad</h3>
          <form className={s.formulario} onSubmit={handleSubmit}>
            <div className={s.items}>
              <span>Nombre: </span>
              <input type="text" name="name" onChange={handleChange} value={inputs.name} className={error.name ? s.danger : undefined} />
              <span className={s.spanDanger}>{error.name ? error.msj : undefined}</span>
            </div>
            <div className={s.items}>
              <div className={s.radiobutton}>
                <span>Dificultad: </span> 
                <input type="radio" name="difficulty" value={1} onChange={handleChange} id={'1'}/>
                <label htmlFor={'1'}>1</label>
                <input type="radio" name="difficulty" value={2} onChange={handleChange} id={'2'}/>
                <label htmlFor={'2'}>2</label>
                <input type="radio" name="difficulty" value={3} onChange={handleChange} id={'3'}/>
                <label htmlFor={'3'}>3</label>
                <input type="radio" name="difficulty" value={4} onChange={handleChange} id={'4'}/>
                <label htmlFor={'4'}>4</label>
                <input type="radio" name="difficulty" value={5} onChange={handleChange} id={'5'}/>
                <label htmlFor={'5'}>5</label>
              </div>
            </div>
            <div className={s.twoInputs}>
              <div className={s.items}>
                <span>Duración: </span>
                <input type="number" name="duration" onChange={handleChange} value={inputs.duration} className={error.duration ? s.danger : undefined}/>
                <span className={s.spanDanger}>{error.duration ? error.msj : undefined}</span>
              </div>

              <div className={s.items}>
                <span>Temporada: </span>
                <select className={error.season ? s.danger : undefined} name="season" onChange={handleChange}>
                  <option value="">Escoge una opción</option>
                  <option value="Verano">Verano</option>
                  <option value="Invierno">Invierno</option>
                  <option value="Otoño">Otoño</option>
                  <option value="Primavera">Primavera</option>
                </select>
                <span className={s.spanDanger}>{error.season ? error.msj : undefined}</span>
              </div>
            </div>

            <div className={s.items}>
              <span>Countries: </span>
              <select className={s.selectC} name="countries" onChange={(e) => handleChangeCountries(e)}>
                <option valuedefault=" ">Selecciona un país</option>
                {countries.map((p) => {
                  return <option key={p.id} value={p.id}>{p.name}</option>
                })}
              </select>
            </div>
            <div className={s.containerCountryAdd}>
              {inputs.countries?.map((c) => {
                let pais = countries.filter((p) => p.id === c);
                return <ButtonDelete deleteCountrie={deleteCountrie} pais={pais} c={c} />
              })}
            </div>
            <button className={s.buttonCrear} type="submit">Crear</button>
          </form>

        </div>


        <div className={s.activitiesContainer}>
          <ul>
            {actividades?.map((a) => {
              return <li>{a.name}</li>
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
