import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Nav from '../../components/Nav/Nav'
import { validateForm, validateSubmit, resetInput } from '../../controllers/utils'
import s from '../AddActivities/Activities.module.css'
import * as actions from '../../redux/actions/index.js'
import ButtonDelete from '../../components/buttonDelete/ButtonDelete'
import Loading from '../../components/Loading/Loading'
import Modal from '../../components/Modal/Modal'

export default function Activities() {

  const dispatch = useDispatch();
  const [actividades, setActividades] = useState();

  const activities = useSelector((state) => state.actTuristica);
  const countries = useSelector((state) => state.countries);
  const [isLoading, setIsLoading] = useState(true);
  const [ModalOn, setModalOn] = useState(false);

  useEffect(() => {
    dispatch(actions.getAllCountries())
    dispatch(actions.getActivities())
  }, [dispatch])

  useEffect(() => {
    setIsLoading(true)
    setActividades(activities)
    setIsLoading(false)
  }, [activities])

  const [inputs, setInputs] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  })

  const [error, setError] = useState({});

  if (isLoading) return <Loading />

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })

    setError(validateForm({ ...inputs, [e.target.name]: e.target.value }))
    console.log(inputs);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateSubmit(inputs)) {
      setModalOn(true)
    } else {
      dispatch(actions.createTouristActivity(inputs));
      setActividades(activities)
      setModalOn(true)
    }
    setTimeout(() => {
      setModalOn(false)
      dispatch(actions.getActivities())
    }, 1200);
  }

  if (ModalOn) {
    const validate = validateSubmit(inputs);
    if (validate) {
      return (
        <Modal error={true}>
          <h1>Error</h1>
          <p>Los campos deben ser validos!</p>
        </Modal>
      )
    } else {
      return (
        <Modal error={false}>
          <h2>Success</h2>
          <p>La actividad se ha creado con exito!</p>
        </Modal>)
    }
  }

  const handleChangeCountries = (e) => {
    let valor = e.target.value
    if (valor === '') {
      return alert('Este campo no puede ser vacio')
    }
    if (inputs.countries.includes(valor)) {
      return alert('El país ya fue añadido a la lista')
    }
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
              <input type="text" name="name" onChange={handleChange} value={inputs.name} className={error.name ? s.danger : s.inputName} autoComplete='off' />
              <span className={s.spanDanger}>{error.name ? error.msj : undefined}</span>
            </div>
            <div className={s.items}>
              <div className={s.radiobutton}>
                <span>Dificultad: </span>
                <input type="radio" name="difficulty" value={1} onChange={handleChange} id={'1'} />
                <label htmlFor={'1'}>1</label>
                <input type="radio" name="difficulty" value={2} onChange={handleChange} id={'2'} />
                <label htmlFor={'2'}>2</label>
                <input type="radio" name="difficulty" value={3} onChange={handleChange} id={'3'} />
                <label htmlFor={'3'}>3</label>
                <input type="radio" name="difficulty" value={4} onChange={handleChange} id={'4'} />
                <label htmlFor={'4'}>4</label>
                <input type="radio" name="difficulty" value={5} onChange={handleChange} id={'5'} />
                <label htmlFor={'5'}>5</label>
              </div>
            </div>
            <div className={s.twoInputs}>
              <div className={s.items}>
                <span>Duración: </span>
                <input type="number" name="duration" onChange={handleChange} value={inputs.duration} className={error.duration ? s.danger : undefined} autoComplete='off' placeholder='Duracion en minutos' />
                <span className={s.spanDanger}>{error.duration ? error.msj : undefined}</span>
              </div>

              <div className={s.items}>
                <span>Temporada: </span>
                <select className={error.season ? s.danger : undefined} name="season" onChange={handleChange}>
                  <option key={1} value="">Escoge una opción</option>
                  <option key={2} value="Verano">Verano</option>
                  <option key={3} value="Invierno">Invierno</option>
                  <option key={4} value="Otoño">Otoño</option>
                  <option key={5} value="Primavera">Primavera</option>
                </select>
                <span className={s.spanDanger}>{error.season ? error.msj : undefined}</span>
              </div>
            </div>

            <div className={s.items}>
              <span>Countries: </span>
              <select className={s.selectC} name="countries" onChange={(e) => handleChangeCountries(e)}>
                <option value="">Selecciona un país</option>
                {countries.map((p) => {
                  return <option key={p.id} value={p.id}>{p.name}</option>
                })}
              </select>
            </div>
            <div className={s.containerCountryAdd}>
              {inputs.countries?.map((c, i) => {
                let pais = countries.filter((p) => p.id === c);
                return <ButtonDelete key={i} deleteCountrie={deleteCountrie} pais={pais} c={c} />
              })}
            </div>
            <button className={s.buttonCrear} type="submit">Crear</button>
          </form>
        </div>

        <div className={s.activitiesContainer}>
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
              {actividades?.map((a,i) => {
                return (
                  <tr className={s.textoAct} key={i}>
                    <td>{a.name}</td>
                    <td>{a.difficulty}</td>
                    <td>{a.duration} min</td>
                    <td>{a.season}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
