const { Router } = require('express');
const axios = require('axios');
const { Country, Activities } = require('../db');
const { validatePostActivities } = require('../controllers/controllers');

const router = Router();


router.get('/', async (req, res) => {
    try {
        let activities = await Activities.findAll({
            include: {
                model: Country,
            }
        });
        res.status(200).json(activities)
    }
    catch (error) {
        console.log(error)
    }
});

router.post('/', async (req, res) => {

    const error = validatePostActivities(req.body)
    if (error) return res.status(400).send('Faltan datos obligatorios')

    const { name, difficulty, duration, season, countries } = req.body;

    try {
        let existActivity = await Activities.findOne({ where: { name: req.body.name.toLowerCase() } });
        if (!existActivity) {
            let newActivity = await Activities.create({
                name: name.toLowerCase(),
                difficulty,
                duration,
                season,
                countries
            })
            let resultado = await newActivity.setCountries(req.body.countries)
            res.send({ data: resultado, success: 'La actividad fue creada con exito!' })

        } else {
            res.send({ error: 'La actividad ya existe' })
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;