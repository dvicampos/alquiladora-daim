const Inflable = require('../models/Inflable');

exports.getAllInflables = async (req, res) => {
    // cuidar que se haya iniciado sesion para entra a vista
    if (!req.session.user) {
        return res.redirect('/login');
    }
    try {
        const inflables = await Inflable.find();
        res.render('inflables', { inflables });
    } catch (err) {
        console.error(err);
        res.send('Server error');
    }
};

exports.getAddInflable = (req, res) => {
    res.render('addInflable');
};

exports.postAddInflable = async (req, res) => {
    const { tipoInflables, precioInflables, stockInflables } = req.body;
    try {
        const newInflable = new Inflable({ tipoInflables, precioInflables, stockInflables });
        await newInflable.save();
        res.redirect('/inflables');
    } catch (err) {
        console.error(err);
        res.render('addInflable', { error: 'Server error' });
    }
};

exports.getEditInflable = async (req, res) => {
    try {
        const inflable = await Inflable.findById(req.params.id);
        res.render('editInflable', { inflable });
    } catch (err) {
        console.error(err);
        res.send('Server error');
    }
};

exports.postEditInflable = async (req, res) => {
    const { tipoInflables, precioInflables, stockInflables } = req.body;
    try {
        await Inflable.findByIdAndUpdate(req.params.id, { tipoInflables, precioInflables, stockInflables });
        res.redirect('/inflables');
    } catch (err) {
        console.error(err);
        res.render('editInflable', { error: 'Server error' });
    }
};

exports.deleteInflable = async (req, res) => {
    try {
        await Inflable.findByIdAndDelete(req.params.id);
        res.redirect('/inflables');
    } catch (err) {
        console.error(err);
        res.send('Server error');
    }
};
