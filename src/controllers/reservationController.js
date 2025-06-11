const { Reservation, Seat, ReservationSeat, Ticket } = require('../models/Index');

exports.getAll = async (req, res) => {
    const list = await Reservation.findAll({ include: [Seat, Ticket] });
    res.json(list);
};
exports.getById = async (req, res) => {
    const item = await Reservation.findByPk(req.params.id, { include: [Seat, Ticket] });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
};
exports.create = async (req, res) => {
    // expects { userId, screeningId, seatIds: [] }
    const { userId, screeningId, seatIds } = req.body;
    const reservation = await Reservation.create({ userId, screeningId });
    await Promise.all(seatIds.map(id => ReservationSeat.create({ reservationId: reservation.id, seatId: id })));
    res.status(201).json(reservation);
};
exports.update = async (req, res) => {
    const item = await Reservation.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    await item.update(req.body);
    res.json(item);
};
exports.remove = async (req, res) => {
    const item = await Reservation.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    await item.destroy();
    res.status(204).end();
};