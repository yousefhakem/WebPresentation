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
    // expects { reservationId, code }
    const ticket = await Ticket.create(req.body);
    res.status(201).json(ticket);
};
exports.remove = async (req, res) => {
    const item = await Ticket.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    await item.destroy();
    res.status(204).end();
};

