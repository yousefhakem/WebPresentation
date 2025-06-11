
const { Room, Seat } = require('../models/Index');

exports.getAll = async (req, res) => {
    const rooms = await Room.findAll({ include: Seat });
    res.json(rooms);
};
exports.getById = async (req, res) => {
    const room = await Room.findByPk(req.params.id, { include: Seat });
    if (!room) return res.status(404).json({ message: 'Not found' });
    res.json(room);
};
exports.create = async (req, res) => {
    const room = await Room.create(req.body);
    res.status(201).json(room);
};
exports.update = async (req, res) => {
    const room = await Room.findByPk(req.params.id);
    if (!room) return res.status(404).json({ message: 'Not found' });
    await room.update(req.body);
    res.json(room);
};
exports.remove = async (req, res) => {
    const room = await Room.findByPk(req.params.id);
    if (!room) return res.status(404).json({ message: 'Not found' });
    await room.destroy();
    res.status(204).end();
};