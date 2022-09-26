
import { GET_ALL_COUNTRIES, GET_COUNTRY_DETAILS, SEARCH_COUNTRY_BY_NAME, GET_ACTIVITIES} from '../actions';




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
        case SEARCH_COUNTRY_BY_NAME:
            break
        case GET_ACTIVITIES:
            return {
                ...state,
                actTuristica: payload,
            }
        default:
            return state 
    }
};

export default rootReducer;