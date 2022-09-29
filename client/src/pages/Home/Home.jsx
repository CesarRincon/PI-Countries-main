import React, { useEffect, useState, useRef } from 'react'
import * as actions from '../../redux/actions/index'
import { useDispatch, useSelector } from "react-redux";
import CardFlag from '../../components/CardsFlag/CardFlag.jsx'
import Select from '../../components/Select/Select.jsx'
import s from './Home.module.css'
import Nav from '../../components/Nav/Nav';
import Paginated from '../../components/paginated/Paginated';
import Search from '../../components/search/Search';
import { continentes } from '../../controllers/utils';
import Loading from '../../components/Loading/Loading';
import toggleMenu from '../../image/icon-menu.png'

export default function Countries() {

  const dispatch = useDispatch();
  const ref = useRef(null)

  const [isLoading, setIsLoading] = useState(true);
  const [toggle, setToggle] = useState(true)
  const [currentPage, setcurrentPage] = useState(0);
  const stateAllCountries = useSelector((state) => state.countries);
  const stateActivities = useSelector((state) => state.actTuristica);
  const [country, setCountry] = useState([]);
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(actions.getAllCountries())
    dispatch(actions.getActivities())

  }, [dispatch])

  useEffect(() => {
    setIsLoading(true)
    setCountry([...stateAllCountries])
    setIsLoading(false)

  }, [stateAllCountries])

  window.addEventListener('resize', function (e) {
    let width = window.innerWidth
    console.log(width);
    if (width < 1200) {
      setToggle(false)
    } else {
      setToggle(true)
    }
  })

  if (isLoading) return <Loading />

  const filtrarByContinent = (e) => {
    const value = e.target.value;

    if (value === 'all') {
      setPage(1)
      setcurrentPage(0)
      setCountry([...stateAllCountries])
    } else {
      let filtrado = [...country].filter((c) => c.continente === value)
      if (filtrado.length === 0) {
        filtrado = [...stateAllCountries].filter((c) => c.continente === value)
      }
      setPage(1)
      setcurrentPage(0)
      setCountry([...filtrado])
    }
  }
  const filtrarByActividad = (e) => {
    const value = e.target.value;
    if (value === 'All') {
      setPage(1);
      setcurrentPage(0)
      setCountry([...stateAllCountries])
    } else {
      const filtrado = [...stateActivities].filter((a) => a.id === value)[0].countries
      setCountry(filtrado)
    }
  }
  const sortElements = (e) => {
    const action = e.target.value;
    switch (action) {
      case 'all':
        setcurrentPage(0)
        return setCountry([...stateAllCountries])
      case 'asc':
        setcurrentPage(0)
        return setCountry([...country].sort((a, b) => a.name.localeCompare(b.name)))
      case 'desc':
        setcurrentPage(0)
        return setCountry([...country].sort((a, b) => b.name.localeCompare(a.name)))
      default:
        setcurrentPage(0)
        setCountry([...stateAllCountries]);
    }
  }
  const filteredCountries = () => {
    return [...country].slice(currentPage, currentPage + 10)
  }
  const searchCountry = (e) => {
    let search = e.target.value;
    setcurrentPage(0)
    setCountry([...stateAllCountries].filter((p) => p.name.toLowerCase().includes(search.toLowerCase())))
  }
  const sortByPopulation = (e) => {
    let value = e.target.value;
    if (value === 'mayor') {
      const result = [...country].sort((a, b) => b.poblacion - a.poblacion)
      setCountry(result)
    } else if (value === 'menor') {
      const result = [...country].sort((a, b) => a.poblacion - b.poblacion)
      setCountry(result)
    } else if (value === 'All') {
      setCountry([...stateAllCountries])
    }
  }
  const nextPage = () => {
    if (country.length > currentPage + 10) {
      setPage(page + 1)
      setcurrentPage(currentPage + 10)
    }
    // if (page === 25) {
    //   setPage(1)
    //   setcurrentPage(0)
    // }
  }
  const prevPage = () => {
    if (currentPage > 0) {
      setPage(page - 1)
      setcurrentPage(currentPage - 10)
    }
  }
  const changeDisplay = () => {
    setToggle(!toggle)
  }



  return (
    <div className={s.container} ref={ref}>
      <Nav />
      {/* {console.log(!ref.current? 'no existe' : ref.current.clientWidth)} */}
      <div className={s.search}>
        <div className={s.onlySearch}>
          <label className={s.subtitles}>Buscar: </label>
          <Search searchCountry={searchCountry} />
        </div>
        <div className={s.filters}>
          <div className={s.botonFiltros} onClick={changeDisplay} ><img src={toggleMenu} alt="" /></div>
          <div className={s.containerItems} style={{ display: toggle ? 'flex' : 'none' }}>
            <label className={s.subtitles}>Filtrar por: </label><br />
            <div className={s.items}>
              <span className={s.subtitles}>Continente: </span>
              <select name="filterByContinent" id="" onChange={(e) => filtrarByContinent(e)}>
                <option key={0} value={'all'}>All</option>
                {continentes?.map((e, i) => {
                  return <option key={i} value={e.id}>{e.continent}</option>
                })}
              </select>
            </div>

            <div className={s.items}>
              <label className={s.subtitles}>Actividad Turistica: </label>
              <select name="filtrarByActividad" id="" onChange={(e) => filtrarByActividad(e)}>
                <option defaultValue={"all"}>All</option>
                {stateActivities?.map((a, i) => {
                  return <option key={i} value={a.id}>{a.name}</option>
                })}
              </select>
            </div>

            <div className={s.items}>
              <label className={s.subtitles}>Población: </label>
              <select name="sortByPopulation" id="" onChange={(e) => sortByPopulation(e)}>
                <option key={1} defaultValue={"all"}>All</option>
                <option key={2} value={"mayor"}>Mayor Población</option>
                <option key={3} value={"menor"}>Menor Población</option>
              </select>
            </div>
          </div>

        </div>

        <div className={s.selectSort}>
          <label className={s.subtitles}>Ordenar: </label>
          <Select sortElements={sortElements} className={s.sortlist} />
        </div>

      </div>

      <section className={s.bodyContainer}>
        <section className={s.countriesContainer}>
          {filteredCountries()?.map(p => {
            return <CardFlag key={p.id} id={p.id} name={p.name} flag={p.flag} continente={p.continente} />
          })}
        </section>
      </section>
      <section>
        <Paginated prevPage={prevPage} nextPage={nextPage} currentPage={currentPage} page={page} />
      </section>
    </div>
  )
}
