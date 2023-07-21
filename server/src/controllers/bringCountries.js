const { Country } = require('../db');
const axios = require('axios');
const URL = require('../utils/');

const bringCountries = async () => {
    try {
        const { data } =  await axios(URL)
        await Promise.all(
            data.map(async (country) =>{
                const { cca3, name, flags, continent, capital, subregion, area, population} = country;
                if(!capital) capital = 'Unknown';
                await Country.create({
                    id: cca3,
                    name: name.common,
                    image: flags,
                    continent,
                    capital,
                    subregion,
                    area,
                    population,
                })
            })
        )
        console.log('Countries uploaded to the database');
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    bringCountries
};