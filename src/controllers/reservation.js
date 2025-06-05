/ controllers/reservation.js
const { sequelize, Reservation, ReservationSeat, Ticket, Seat } = require('../models');
const { v4: uuidv4 } = require('uuid');

exports.create = async (req, res, next) => {
  const { screeningId, seatIds } = req.body;
  const userId = req.user.id;

  await sequelize.transaction(async t => {
    // 1) ensure none of these seats is already reserved for that screening
    const conflict = await ReservationSeat.findOne({
      include: [{
        model: Reservation,
        where: { screeningId, status: ['PENDING','CONFIRMED'] }
      }],
      where: { seatId: seatIds }
    }, { transaction: t });
    if (conflict) throw new Error('One or more seats already taken');

    // 2) create reservation
    const reservation = await Reservation.create({
      userId, screeningId, status: 'CONFIRMED'
    }, { transaction: t });

    // 3) link seats
    await reservation.addSeats(seatIds, { transaction: t });

    // 4) issue ticket
    const ticket = await Ticket.create({
      reservationId: reservation.id,
      code: uuidv4().slice(0,8).toUpperCase()
    }, { transaction: t });

    return res.status(201).json({ reservation, ticket });
  });
}; 