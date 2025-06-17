const { Screening, Room } = require('../models/Index');

exports.getAll = async (req, res) => {
  const items = await Screening.findAll();
  res.json(items);
};

exports.getByMovieId = async (req, res) => {
  const { movieId } = req.params;
  try {
    const sessions = await Screening.findAll({
      where: { movieId },
      include: [{ model: Room, attributes: ['id', 'name', 'seatMap'] }],
      order: [['datetime', 'ASC']]
    });
    if (!sessions.length) {
      return res.status(404).json({ message: 'No screenings for this movie' });
    }
    res.json(sessions);
  } catch (err) {
    console.error('Error fetching screenings:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getById = async (req, res) => {
  const { movieId, id } = req.params;
  try {
    const session = await Screening.findOne({
      where: { id, movieId },
      include: [Room]
    });
    if (!session) return res.status(404).json({ message: 'Not found' });
    res.json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.create = async (req, res) => {
  const item = await Screening.create(req.body);
  res.status(201).json(item);
};
exports.update = async (req, res) => {
  const item = await Screening.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  await item.update(req.body);
  res.json(item);
};
exports.remove = async (req, res) => {
  const item = await Screening.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  await item.destroy();
  res.status(204).end();
};