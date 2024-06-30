const Manteleria = require('../models/Manteleria');

exports.getAllMantelerias = async (req, res) => {
    // cuidar que se haya iniciado sesion para entra a vista
    if (!req.session.user) {
        return res.redirect('/login');
    }
  try {
    const mantelerias = await Manteleria.find();
    res.render('mantelerias', { mantelerias });
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
};

exports.getAddManteleria = (req, res) => {
  res.render('addManteleria');
};

exports.postAddManteleria = async (req, res) => {
  const { tipoManteleria, precioManteleria, stockManteleria } = req.body;
  try {
    const newManteleria = new Manteleria({ tipoManteleria, precioManteleria, stockManteleria });
    await newManteleria.save();
    res.redirect('/mantelerias');
  } catch (err) {
    console.error(err);
    res.render('addManteleria', { error: 'Server error' });
  }
};

exports.getEditManteleria = async (req, res) => {
  try {
    const manteleria = await Manteleria.findById(req.params.id);
    res.render('editManteleria', { manteleria });
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
};

exports.postEditManteleria = async (req, res) => {
  const { tipoManteleria, precioManteleria, stockManteleria } = req.body;
  try {
    await Manteleria.findByIdAndUpdate(req.params.id, { tipoManteleria, precioManteleria, stockManteleria });
    res.redirect('/mantelerias');
  } catch (err) {
    console.error(err);
    res.render('editManteleria', { error: 'Server error' });
  }
};

exports.deleteManteleria = async (req, res) => {
  try {
    await Manteleria.findByIdAndDelete(req.params.id);
    res.redirect('/mantelerias');
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
};
