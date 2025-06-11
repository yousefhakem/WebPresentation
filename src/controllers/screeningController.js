const { Screening } = require('../models/Index');

exports.getAll = async (req, res) => {
const items = await Screening.findAll();
res.json(items);
};
exports.getById = async (req, res) => {
const item = await Screening.findByPk(req.params.id);
if (!item) return res.status(404).json({ message: 'Not found' });
res.json(item);
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