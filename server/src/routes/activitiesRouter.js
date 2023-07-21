const { Router } = require('express');

const activitiesRouter = Router();

activitiesRouter.get('/', (req, res) => {
    res.send('NIY: Estoy en activities')
});

activitiesRouter.post('/', (req, res) =>{
    res.send('NIY: Actividad creada')
});

module.exports = activitiesRouter;