
import { GET_ALL_COUNTRIES, GET_COUNTRY_DETAILS, GET_ACTIVITIES, CLEAR_COUNTRY_DETAIL, SEARCH_COUNTRY_BY_NAME} from '../actions';




const initialState = {
    countries: [],
    countryDetail: [],
    actTuristica: [],
};


const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                countries: payload
            }
        case GET_COUNTRY_DETAILS:
            return {
                ...state,
                countryDetail: payload,
            }
        case GET_ACTIVITIES:
            return {
                ...state,
                actTuristica: payload,
            }
        case CLEAR_COUNTRY_DETAIL:
            return {
                ...state,
                countryDetail: []
            }
        case SEARCH_COUNTRY_BY_NAME:
            return {
                ...state,
                countries: payload
            }
        default:
            return state 
    }
};

export default rootReducer;