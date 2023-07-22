const { allCountries, countryById, countryByName } = require('../controllers/countriesControllers');

const getAllCountries = async (req, res) => {
    try {
        const countries = await allCountries();
        res.status(200).json(countries);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getCountryById = async (req, res) => {
    const { id } = req.params;

    try {
        const country = await countryById(id);
        res.status(200).json(countryById);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getCountryByName = async (req, res) => {
    const { name } = req.query;

    try {
        const country = await countryByName(name);
        res.status(200).json(country);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    getAllCountries,
    getCountryById,
    getCountryByName,
};