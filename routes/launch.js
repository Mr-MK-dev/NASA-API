const express = require('express');
const launchController = require('../controller/launchController');
const launchRouter = express.Router();

launchRouter
    .route('/launch')
    .get(launchController.getHabitablePlantes)
    .post(launchController.postNewLaunch);

launchRouter.route('/rockets').get(launchController.getAllRockets);

launchRouter.route('/history').get(launchController.history);
launchRouter.route('/upcomming').get(launchController.upcomming);

launchRouter.route('/rockets/:id').delete(launchController.deleteRocket);
module.exports = launchRouter;
