import React, { useEffect, useState } from 'react'
import * as actions from '../../redux/actions/index'
import s from '../Slider/Slider.module.css'
import { useDispatch, useSelector } from "react-redux";

export default function Slider() {

    const dispatch = useDispatch();

    const stateAllCountries = useSelector((state) => state.countries);

    const [flags, setFlags] = useState([]);

    useEffect(() => {
        dispatch(actions.getAllCountries())
    }, [dispatch])

    useEffect(() => {
        setFlags([...stateAllCountries].slice(0, 30));
    }, [stateAllCountries])

    return (
        <div className={s.container}>
            <div className={s.sliderContainer}>
                {flags?.map((f,i) => {
                    return <img key={i} className={s.imageFlag} src={f.flag} alt={'Banderas'}/>
                })}
            </div>  
        </div>
    )
}
