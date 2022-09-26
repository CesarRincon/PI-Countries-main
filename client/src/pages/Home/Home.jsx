import React, { useEffect, useState } from 'react'
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

export default function Countries() {

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setcurrentPage] = useState(0);
  const dispatch = useDispatch();
  const stateAllCountries = useSelector((state) => state.countries);
  const stateActivities = useSelector((state) => state.actTuristica);
  const [country, setCountry] = useState([]);
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(actions.getAllCountries())
    dispatch(actions.getActivities())
 
  }, [dispatch])

  useEffect(() => {
    
    setCountry([...stateAllCountries])
    
  }, [stateAllCountries])

  if (!isLoading) return <Loading />

  const filtrarByContinent = (e) => {
    const value = e.target.value;
    console.log(value);
    if (value === 'all') {
      setPage(1)
      setcurrentPage(0)
      setCountry([...stateAllCountries])
    } else {
      const filtrado = [...stateAllCountries].filter((c) => c.continente === value)
      setPage(1)
      setcurrentPage(0)
      setCountry([...filtrado])
    }
  }

  const filtrarByActividad = (e) => {
    const value = e.target.value;
    console.log(value);
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
  }
  const prevPage = () => {
    if (currentPage > 0) {
      setPage(page - 1)
      setcurrentPage(currentPage - 10)
    }
  }

  return (
    <div className={s.container}>
      <Nav />
      <section className={s.search}>
        <label className={s.subtitles}>Buscar: </label>
        <Search searchCountry={searchCountry} />
        <div className={s.filters}>
          <label className={s.subtitles}>Filtrar por: </label><br />
          <div className={s.items}>
            <span>Continente: </span>
            <select name="filterByContinent" id="" onChange={(e) => filtrarByContinent(e)}>
              <option value={'all'}>All</option>
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
              <option defaultValue={"all"}>All</option>
              <option value={"mayor"}>Mayor Población</option>
              <option value={"menor"}>Menor Población</option>
            </select>
          </div>

        </div>


        <div className={s.selectSort}>
          <label className={s.subtitles}>Ordenar: </label>
          <Select sortElements={sortElements} className={s.sortlist} />
        </div>
      </section>
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