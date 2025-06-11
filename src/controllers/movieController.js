const { Movie } = require('../models/Index');

exports.getAll = async (req, res) => {
    const movies = await Movie.findAll();
    res.json(movies);
};
exports.getById = async (req, res) => {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Not found' });
    res.json(movie);
};
exports.create = async (req, res) => {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
};
exports.update = async (req, res) => {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Not found' });
    await movie.update(req.body);
    res.json(movie);
};
exports.remove = async (req, res) => {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Not found' });
    await movie.destroy();
    res.status(204).end();
};

