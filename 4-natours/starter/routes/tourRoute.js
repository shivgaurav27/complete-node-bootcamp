const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

// check id middleware function
// router.param('id', tourController.checkID);

// create a check body middleware
// check if body contains the name and price property
// if not send back 400 (bad request)
// add it to post handlers stack

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
