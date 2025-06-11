const express = require('express');
const router = express.Router();
const ctrlTickets = require('../controllers/ticketController');
const { authenticate } = require('../middleware/authMiddleware');
router.get('/', authenticate, ctrlTickets.getAll);
router.get('/:id', authenticate, ctrlTickets.getById);
router.post('/', authenticate, ctrlTickets.create);
router.delete('/:id', authenticate, ctrlTickets.remove);
module.exports = router;