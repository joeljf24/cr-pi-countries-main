const { getAllCountries, getCountryById, getCountryByName } = require('../handlers/countriesHandlers');
const { Router } = require('express');

const countriesRouter = Router();

countriesRouter.get('/', getAllCountries);
countriesRouter.get('/name', getCountryByName);
countriesRouter.get('/:id', getCountryById);

module.exports = countriesRouter;