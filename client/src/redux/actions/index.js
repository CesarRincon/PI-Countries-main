import axios from 'axios'

export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const SEARCH_COUNTRY_BY_NAME = 'SEARCH_COUNTRY_BY_NAME';
export const GET_COUNTRY_DETAILS = 'GET_COUNTRY_DETAILS';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const CREATE_ACT_TURISTICA = 'CREATE_ACT_TURISTICA';
export const DELETE_ACT_TURISTICA = 'CREATE_ACT_TURISTICA';

export const getAllCountries = () => {
    return async function (dispatch) {
        return axios.get('http://localhost:3001/countries')
            .then(res => res.data)
            .then(data => {
                dispatch({
                    type: GET_ALL_COUNTRIES,
                    payload: data,
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const getCountrieDetail = (idPais) => {
    return async function (dispatch) {
        return axios.get(`http://localhost:3001/countries/${idPais}`)
            .then(res => res.data)
            .then(data => {
                dispatch({
                    type: GET_COUNTRY_DETAILS,
                    payload: data,
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const searchCountryByName = (name) => {
    return {
        type: SEARCH_COUNTRY_BY_NAME,
        payload: name,
    }
}

export const getActivities = () => {
    return async function (dispatch) {
        return axios.get('http://localhost:3001/activities')
            .then(res => res.data)
            .then(data => {
                dispatch({
                    type: GET_ACTIVITIES,
                    payload: data,
                })
                
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const createTouristActivity = (values) => {
    return async function (dispatch) {
        axios.post('http://localhost:3001/activities', values)
        .then(res => res.data)
        .then(data => {
            if (data.error) {
                alert(data.error)
            } else {
                alert(data.success)
            }

        })
        // return datos
    }

}

export const deleteTouristActivity = (id) => {
    return {
        type: DELETE_ACT_TURISTICA,
        payload: id,
    }
}