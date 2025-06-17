const screeningRouter =  require('./screening.js');
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/movieController');
const { authenticate } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use('/:movieId/screenings/', screeningRouter);
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', authenticate, authorize('ADMIN'), ctrl.create);
router.put('/:id', authenticate, authorize('ADMIN'), ctrl.update);
router.delete('/:id', authenticate, authorize('ADMIN'), ctrl.remove);
module.exports = router;