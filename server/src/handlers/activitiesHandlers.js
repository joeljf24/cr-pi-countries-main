const { allActivities, createActivity } = require('../controllers/activitiesControllers');


const postActivity = async (req, res) => {
    const { name, difficulty, season, countries } = req.body;

    try {
        const activity = await createActivity(name, difficulty, season, countries);
        res.status(200).json(activity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllActivities = async (req, res) => {
    try {
        const activities = await allActivities();
        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    postActivity,
    getAllActivities,
};