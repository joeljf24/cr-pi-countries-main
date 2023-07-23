const { postActivity, getAllActivities } = require('../handlers/activitiesHandlers');
const { Router } = require('express');

const activitiesRouter = Router();

activitiesRouter.get('/', getAllActivities);
activitiesRouter.post('/', postActivity);

module.exports = activitiesRouter;