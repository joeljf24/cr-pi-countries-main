const { Router } = require('express');
const { getAllCountries } = require('../handlers/countriesHandlers')

const countriesRouter = Router();

countriesRouter.get('/', getAllCountries)

countriesRouter.get('/:idPais', (req, res) => {
    res.send('NIY: Estoy en un country hallado por ID')
})

countriesRouter.get('/name?=', (req, res) => {
    res.send('NIY: Estoy en un country hallado por su nombre')
})

module.exports = countriesRouter;