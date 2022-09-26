const { Router } = require('express');
const countries = require('./countries')
const activities = require('./activities')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/countries', countries)
router.use('/activities', activities)

module.exports = router;


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);




