const express = require('express');
const launchController = require('../controller/launchController');
const launchRouter = express.Router();

launchRouter
    .route('/launch')
    .get(launchController.getHabitablePlantes)
    .post(launchController.postNewLaunch);

launchRouter.route('/rockets').get(launchController.getAllRockets);
module.exports = launchRouter;
