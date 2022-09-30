const axios = require('axios');
const { Country, Activities } = require('../db');

module.exports = {
    loadDb: async () => {
        try {
            let table = await Country.findAll();
            if (!table.length) {
                const api = await axios.get('https://restcountries.com/v3/all')
                const apiInfo = api.data.map((p) => {
                    return {
                        id: p.cca3.toLowerCase(),
                        name: p.name.common,
                        flag: p.flags[0],
                        continente: p.region,
                        capital: p.capital ? p.capital[0] : "Doesn't have capital",
                        subregion: p.subregion,
                        area: p.area,
                        poblacion: p.population
                    }
                });
                await Country.bulkCreate(apiInfo);
            };
            console.log('database is loaded');
        } catch (error) {
            console.log(error);
        }

    },

    validatePostActivities: (body) => {
        if (!body.name || !body.difficulty || !body.duration || !body.season || !body.countries) return true;
        else return false;
    }
}