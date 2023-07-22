const { allActivities } = require('../controllers/activitiesControllers')

const getAllActivities = async (req, res) => {
    try {
        const activities = await allActivities;
        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getAllActivities,
};