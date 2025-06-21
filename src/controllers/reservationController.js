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
  try {
    const { seatIds, screeningId } = req.body;
    const userId = req.user.id;                // ← lo coges del middleware
    console.log("Creando reserva para userId=", userId);

    const reservation = await Reservation.create({ userId, screeningId });

    await Promise.all(
      seatIds.map(id =>
        ReservationSeat.create({ reservationId: reservation.id, seatId: id })
      )
    );

    res.status(201).json(reservation);
  } catch (error) {
    console.error('Error creando reserva:', error);
    res.status(500).json({ message: error.message });
  }
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