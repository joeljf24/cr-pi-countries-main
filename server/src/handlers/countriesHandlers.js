const { allCountries } = require('../controllers/countriesControllers')

const getAllCountries = async (req, res) => {
    try {
        const countries = await allCountries();
        res.status(200).json(countries)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

module.exports = {
    getAllCountries,
};