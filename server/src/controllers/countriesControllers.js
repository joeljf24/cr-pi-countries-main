const { Country, Activity } = require('../db');
const { Op } = require('sequelize');


const allCountries = async () => {
    const countries = await Country.findAll({
        include: {
            model: Activity,
            through: {
                attributes: [],
            }
        }
    });

    countries.sort((a, b) => a.name.localeCompare(b.name));
    
    if(!countries) throw Error ('The countries are not found in the database');

    return countries;
};

const countryById = async (id) => {
    const countryById = await Country.findOne({
        where: { id },
        include: {
            model: Activity,
            through: {
                attributes: [],
            }
        }
    });

    if(!countryById) throw Error ('There is no country with that ID');

    return countryById;
};

const countryByName = async (name) => {
    const country = await Country.findAll({
        where: { name: {
            [Op.iLike]: `${name}%`,
        }}
    });
    
    if(!country) throw Error('The country with that name does not exist');
    
    return country;
};


module.exports = {
    allCountries,
    countryById,
    countryByName,
};