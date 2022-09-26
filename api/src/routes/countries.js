const { Router } = require('express');
const axios = require('axios');
const { Country, Activities } = require('../db');
const { Op } = require("sequelize");

const router = Router();
//router.get('/countries')
router.get('/', async (req, res) => {
    let { name } = req.query

    try {
        let countries = await Country.findAll({
            include: {
                model: Activities,
            }
        });
        if (name) {
            const searchedCountry = await Country.findAll({
                where: { name: { [Op.iLike]: `%${name}%` } } });

            searchedCountry.length !== 0 ? res.status(200).send(searchedCountry) : res.status(404).send('País no encontrado');

        } else return res.status(200).send(countries);
    }
    catch (error) {
        console.log(error);
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        let country = await Country.findByPk(id, {
            include: {
                model: Activities,
            }
        })
        if (country) return res.json(country)
        else return res.status(404).send('Country no found')
    } catch (error) {
        res.status(500).send(error)
    }

    console.log(country.dataValues)
    res.send(country.dataValues)
})



module.exports = router;