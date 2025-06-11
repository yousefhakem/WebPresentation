const { Seat } = require('../models/Index');

exports.getAll = async (req, res) => {
    const seats = await Seat.findAll();
    res.json(seats);
};
exports.getById = async (req, res) => {
    const seat = await Seat.findByPk(req.params.id);
    if (!seat) return res.status(404).json({ message: 'Not found' });
    res.json(seat);
};
exports.create = async (req, res) => {
    const seat = await Seat.create(req.body);
    res.status(201).json(seat);
};
exports.update = async (req, res) => {
    const seat = await Seat.findByPk(req.params.id);
    if (!seat) return res.status(404).json({ message: 'Not found' });
    await seat.update(req.body);
    res.json(seat);
};
exports.remove = async (req, res) => {
    const seat = await Seat.findByPk(req.params.id);
    if (!seat) return res.status(404).json({ message: 'Not found' });
    await seat.destroy();
    res.status(204).end();
};