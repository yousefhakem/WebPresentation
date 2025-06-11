const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/Index');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, passwordHash: hash });
        res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};