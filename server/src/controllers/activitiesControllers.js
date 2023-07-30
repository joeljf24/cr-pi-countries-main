const { Activity, Country } = require('../db');


const createActivity = async (name, difficulty, season, countries) => {
    if(!name && !difficulty && !season && !countries) {
        throw Error ("Cannot create a new activity. Some fields are missing.");
    }
    else {
        let arrayOfCountries = [];
        
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


module.exports = {
    createActivity,
    allActivities,
};