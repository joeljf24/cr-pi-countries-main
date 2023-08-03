const { allActivities, createActivity, activitiesAssociation, deleteActivity, updateActivity } = require('../controllers/activitiesControllers');


const postActivity = async (req, res) => {
    const { name, difficulty, duration, season, countries } = req.body;

    try {
        const activity = await createActivity(name, difficulty, duration, season, countries);
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

const deleteActivtiesAssociation = async (req, res) => {
    const { activityId, countryId } = req.params;
  
    try {
      await activitiesAssociation(activityId, countryId);
      return res.status(200).json({ message: 'Country removed from activity successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}; 

const deleteEntireActivity = async (req, res) => {
    const { id } = req.params;
    
    try {
        const deleteAct = deleteActivity(id);
        res.status(200).json(deleteAct);
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
};

const updateOneActivity = async (req, res) => {
    const { id } = req.params;
    const { name, difficulty, duration, season, countries } = req.body;

    try {
        const update = updateActivity(id, name, difficulty, duration, season, countries)
        res.status(200).json(update)
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
};


module.exports = {
    postActivity,
    getAllActivities,
    deleteActivtiesAssociation,
    deleteEntireActivity,
    updateOneActivity,
};