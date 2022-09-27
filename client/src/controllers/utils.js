export const validateForm = (data) => {
    let error = {};
    if (!data.name) {
        error.name = true;
        error.msj = 'Este campo es requerido'
    }
    else if (data.name.length < 3) {
        error.name = true
        error.msj = 'El nombre no es valido'
    }
    else if (data.countries === []) {
        error.name = true;
        error.msj = 'Este campo es requerido'
    }
    else if (data.duration === String) {
        error.duration = true;
        error.msj = 'Solo numeros'
    }
    else if (parseInt(data.duration) <= 0) {
        error.duration = true;
        error.msj = 'Debe ser mayor a cero';
    }
    else if (data.duration === []) {
        error.duration = true;
        error.msj = 'Este campo es requerido'
    }
    return error
}

export const validateSubmit = (data) => {
    if (!data.name || !data.countries.length || !data.difficulty || !data.duration || !data.season) {
        return true
    } else return false
}

export const resetInput = () => {
   return  ({
            name: "",
            difficulty: "",
            duration: "",
            season: "",
            countries: [],
        })
}

export const continentes = [
    {
        id: 'Americas',
        continent: 'America'
    },
    {
        id: 'Asia',
        continent: 'Asia'
    },
    {
        id: 'Africa',
        continent: 'Africa'
    },
    {
        id: 'Antarctic',
        continent: 'Antartida'
    },
    {
        id: 'Europe',
        continent: 'Europa'
    },
    {
        id: 'Oceania',
        continent: 'Oceania'
    }
]