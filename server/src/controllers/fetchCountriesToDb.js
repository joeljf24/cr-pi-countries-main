const { Country } = require('../db');
const axios = require('axios');
const URL = 'http://localhost:5000/countries';

const fetchCountries = async () => {
    const { data } = await axios.get(URL)
    await Promise.all(
        data.map(async (country) => {
            let { cca3, name, flags, continents, capital, subregion, area, population } = country;

            if(!capital) capital = ['Unknown']

            await Country.create({
                id: cca3,
                name: name.common,
                image: flags.png,
                continent: continents[0],
                capital: capital[0],
                subregion,
                area,
                population,
            });
        })
    );
    console.log('Countries uploaded to the database');
};

module.exports = {
    fetchCountries
};