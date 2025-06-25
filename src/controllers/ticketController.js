const { Ticket } = require('../models/Index');

exports.getAll = async (req, res) => {
    const list = await Ticket.findAll();
    res.json(list);
};
exports.getById = async (req, res) => {
    const item = await Ticket.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
};
exports.create = async (req, res) => {
  const { reservationId, code } = req.body;
  if (!reservationId) {
    return res.status(400).json({ message: 'reservationId is required' });
  }
  const ticket = await Ticket.create({ reservationId, code });
  res.status(201).json(ticket);
};

exports.remove = async (req, res) => {
    const item = await Ticket.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    await item.destroy();
    res.status(204).end();
};

