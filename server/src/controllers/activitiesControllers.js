const { Activity, Country, conn } = require('../db');

const createActivity = async (name, difficulty, duration, season, countries) => {

    if(!name || !difficulty || !season || !countries) {
        throw Error ("Cannot create a new activity. Some fields are missing.");
    }
    else {
        let arrayOfCountries = [];
        
        const activity = {
            name,
            difficulty,
            duration,
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
    };
};

const allActivities = async () => {
    const activities = await Activity.findAll({
        include: {
            model: Country,
            through: {
                attributes: [],
            }
        }
    });
    
    if(activities.length === 0) throw Error ('There are no activities');
    
    return activities;    
};

const activitiesAssociation = async (activityId, countryId) => {
  const activity = await Activity.findByPk(activityId);
  if (!activity) {
    throw Error('Activity not found');
  }

  const country = await Country.findByPk(countryId);
  if (!country) {
    throw Error('Country not found');
  }

  // Verificar si el país está asociado a la actividad antes de eliminarlo
  const isAssociated = await activity.hasCountry(country);
  if (!isAssociated) {
    throw Error('Country is not associated with the activity');
  }

  // Eliminar la asociación entre la actividad y el país
  await activity.removeCountry(country);

  // Verificar si la actividad ya no tiene más países asociados
  const remainingCountries = await activity.getCountries();
  if (remainingCountries.length === 0) {
    // Si no hay más países asociados, eliminamos completamente la actividad
    await activity.destroy();
  }
};

const deleteActivity = async (id) => {
    const deleteAct = await Activity.destroy({
        where: { id }
    })
    return deleteAct;
};

const updateActivity = async (id, name, difficulty, duration, season, countries) => {
    const activity = await Activity.findByPk(id, {
        include: [Country], // Para cargar la relación de países asociados a la actividad
    });

    if (!activity) {
        throw Error('Activity not found');
    }

    // Actualizamos los atributos de la actividad con los datos recibidos del frontend
    activity.name = name;
    activity.difficulty = difficulty;
    activity.duration = duration;
    activity.season = season;

    // Luego, podemos eliminar todos los países asociados a la actividad
    await activity.removeCountries(activity.Countries);

    // Y finalmente, podemos agregar los países recibidos en el cuerpo de la solicitud
    if (countries && Array.isArray(countries)) {
        for (const countryId of countries) {
        const country = await Country.findByPk(countryId);
        if (country) {
            await activity.addCountry(country);
        }
        }
    }

    // Guardamos los cambios en la base de datos
    await activity.save();
};

module.exports = {
    createActivity,
    allActivities,
    activitiesAssociation,
    deleteActivity,
    updateActivity,
};