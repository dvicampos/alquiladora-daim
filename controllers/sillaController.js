const Silla = require('../models/Silla');

exports.getAllSillas = async (req, res) => {
    // cuidar que se haya iniciado sesion para entra a vista
    if (!req.session.user) {
        return res.redirect('/login');
    }
  try {
    const sillas = await Silla.find();
    res.render('sillas', { sillas });
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
};

exports.getAddSilla = (req, res) => {
  res.render('addSilla');
};

exports.postAddSilla = async (req, res) => {
  const { tipoSilla, precioSilla, stockSilla } = req.body;
  try {
    const newSilla = new Silla({ tipoSilla, precioSilla, stockSilla });
    await newSilla.save();
    res.redirect('/sillas');
  } catch (err) {
    console.error(err);
    res.render('addSilla', { error: 'Server error' });
  }
};

exports.getEditSilla = async (req, res) => {
  try {
    const silla = await Silla.findById(req.params.id);
    res.render('editSilla', { silla });
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
};

exports.postEditSilla = async (req, res) => {
  const { tipoSilla, precioSilla, stockSilla } = req.body;
  try {
    await Silla.findByIdAndUpdate(req.params.id, { tipoSilla, precioSilla, stockSilla });
    res.redirect('/sillas');
  } catch (err) {
    console.error(err);
    res.render('editSilla', { error: 'Server error' });
  }
};

exports.deleteSilla = async (req, res) => {
  try {
    await Silla.findByIdAndDelete(req.params.id);
    res.redirect('/sillas');
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
};
