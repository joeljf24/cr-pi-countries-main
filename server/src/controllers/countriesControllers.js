const { Country } = require('../db');
const { Op } = require('sequelize');

const allCountries = async () => {
    const countries = await Country.findAll();

    if(!countries) throw Error ('The countries are not found in the database');

    return countries;
};

const countryById = async (id) => {
    const countryById = await Country.findOne({
        where: { id }
    }/*,
    {
        include: {
            model: Activity,
            attributes: ['name', 'season', 'difficulty'],
        },
    }*/);

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

/*
📍 GET | /countries
Obtiene un arreglo de objetos, donde cada objeto es un país con toda su información.
📍 GET | /countries/:idPais
Esta ruta obtiene el detalle de un país específico. Es decir que devuelve un objeto con la información pedida en el detalle de un país.
El país es recibido por parámetro (ID de tres letras del país).
Tiene que incluir los datos de las actividades turísticas asociadas a este país.
📍 GET | /countries/name?="..."
Esta ruta debe obtener todos aquellos países que coinciden con el nombre recibido por query. (No es necesario que sea una coincidencia exacta).
Debe poder buscarlo independientemente de mayúsculas o minúsculas.
Si no existe el país, debe mostrar un mensaje adecuado.
*/