const { Activity, Country } = require('../db');


const createActivity = async (name, difficulty, season, countries) => {
    let arrayOfCountries = [];

    if(name && difficulty && season && countries) {
        const activity = {
            name,
            difficulty,
            season,
            countries,
        };

        for (const country of countries) {
            let addCountry = await Country.findOne({
                where: {
                    name: country,
                }
            })
            arrayOfCountries.push(addCountry);
        };

        const newActivity = await Activity.create(activity);

        await newActivity.addCountry(arrayOfCountries);

        return newActivity;
    }
    else {
        throw Error ("Cannot create a new activity. Some fields are missing.");
    };
};

const allActivities = async () => {
    
    const activities = await Activity.findAll();
    
    if(activities.length === 0) throw Error ('There are no activities');
    
    return activities;    
};   


module.exports = {
    createActivity,
    allActivities,
};

/*
📍 POST | /activities
Esta ruta recibirá todos los datos necesarios para crear una actividad turística y relacionarla con los países solicitados.
Toda la información debe ser recibida por body.
Debe crear la actividad turística en la base de datos, y esta debe estar relacionada con los países indicados (al menos uno).
📍 GET | /activities
Obtiene un arreglo de objetos, donde cada objeto es una actividad turística.
*/