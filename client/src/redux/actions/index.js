import axios from 'axios'

export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const SEARCH_COUNTRY_BY_NAME = 'SEARCH_COUNTRY_BY_NAME';
export const GET_COUNTRY_DETAILS = 'GET_COUNTRY_DETAILS';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const CREATE_ACT_TURISTICA = 'CREATE_ACT_TURISTICA';
export const DELETE_ACT_TURISTICA = 'DELETE_ACT_TURISTICA';
export const CLEAR_COUNTRY_DETAIL = 'CLEAR_COUNTRY_DETAIL';

export const getAllCountries = () => {
    return async function (dispatch) {
        return axios.get('/countries')
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
        return axios.get(`/countries/${idPais}`)
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
    return async function (dispatch) {
        return axios.get(`/countries?name=${name}`)
            .then(res => res.data)
            .then(data => {
                dispatch({
                    type: SEARCH_COUNTRY_BY_NAME,
                    payload: data,
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

export const getActivities = () => {
    return async function (dispatch) {
        return axios.get('/activities')
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
        axios.post('/activities', values)
            .then(res => res.data)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    console.log(data.success)
                }

            })
    }

}

export const deleteActivity = (id) => {
    return async function (params) {
        axios.delete('/activities', {data: {id: id }})
            .then(() => console.log('Delete successful'));
    }
}

export const clearCountryDetail = () => {
    return {
        type: CLEAR_COUNTRY_DETAIL,
    }
}