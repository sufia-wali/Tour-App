const express = require('express');
const router = express.Router();

const {
  createTour,
  getAllTours,
  getTour,
  updateTour,
  deleteTour
} = require('./../controllers/tourController');

router.post('/', createTour)
router.get('/', getAllTours)
router.get('/:id', getTour)
router.patch('/:id', updateTour)
router.delete('/:id', deleteTour)

// router.param('id', tourController.checkID);

// router
//   .route('/')
//   .get(tourController.getAllTours)
//   .post(tourController.createTour);

// router
//   .route('/:id')
//   .get(tourController.getTour)
//   .patch(tourController.updateTour)
//   .delete(tourController.deleteTour);

module.exports = router;