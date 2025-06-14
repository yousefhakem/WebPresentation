// routes/screening.js
const express = require('express');
const router  = express.Router({ mergeParams: true }); // <— importante
const ctrl    = require('../controllers/screeningController');
const { authenticate } = require('../middleware/authMiddleware');
const { authorize }   = require('../middleware/roleMiddleware');

router.get('/', ctrl.getByMovieId);     // renombra getAll → getByMovieId


router.get('/:id',ctrl.getById);          // consulta un screening concreto dentro de la movie


// Resto de rutas admin…
router.post('/', authenticate, authorize('ADMIN'), ctrl.create);
router.put('/:id', authenticate, authorize('ADMIN'), ctrl.update);
router.delete('/:id', authenticate, authorize('ADMIN'), ctrl.remove);

module.exports = router;
