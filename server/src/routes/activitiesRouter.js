const { postActivity, getAllActivities, deleteActivtiesAssociation } = require('../handlers/activitiesHandlers');
const { Router } = require('express');

const activitiesRouter = Router();

activitiesRouter.get('/', getAllActivities);
activitiesRouter.post('/', postActivity);
activitiesRouter.delete('/:activityId/countries/:countryId', deleteActivtiesAssociation);

module.exports = activitiesRouter;