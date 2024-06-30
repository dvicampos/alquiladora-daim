const Lona = require('../models/Lona');

exports.getAllLonas = async (req, res) => {
    // cuidar que se haya iniciado sesion para entra a vista
    if (!req.session.user) {
        return res.redirect('/login');
    }
  try {
    const lonas = await Lona.find();
    res.render('lonas', { lonas });
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
};

exports.getAddLona = (req, res) => {
  res.render('addLona');
};

exports.postAddLona = async (req, res) => {
  const { tipoLona, precioLona, stockLona } = req.body;
  try {
    const newLona = new Lona({ tipoLona, precioLona, stockLona });
    await newLona.save();
    res.redirect('/lonas');
  } catch (err) {
    console.error(err);
    res.render('addLona', { error: 'Server error' });
  }
};

exports.getEditLona = async (req, res) => {
  try {
    const lona = await Lona.findById(req.params.id);
    res.render('editLona', { lona });
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
};

exports.postEditLona = async (req, res) => {
  const { tipoLona, precioLona, stockLona } = req.body;
  try {
    await Lona.findByIdAndUpdate(req.params.id, { tipoLona, precioLona, stockLona });
    res.redirect('/lonas');
  } catch (err) {
    console.error(err);
    res.render('editLona', { error: 'Server error' });
  }
};

exports.deleteLona = async (req, res) => {
  try {
    await Lona.findByIdAndDelete(req.params.id);
    res.redirect('/lonas');
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
};
