const Mesa = require('../models/Mesa');

exports.getAllMesas = async (req, res) => {
    // cuidar que se haya iniciado sesion para entra a vista
    if (!req.session.user) {
        return res.redirect('/login');
    }
  try {
    const mesas = await Mesa.find();
    res.render('mesas', { mesas });
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
};

exports.getAddMesa = (req, res) => {
  res.render('addMesa');
};

exports.postAddMesa = async (req, res) => {
  const { tipoMesa, precioMesa, stockMesa } = req.body;
  try {
    const newMesa = new Mesa({ tipoMesa, precioMesa, stockMesa });
    await newMesa.save();
    res.redirect('/mesas');
  } catch (err) {
    console.error(err);
    res.render('addMesa', { error: 'Server error' });
  }
};

exports.getEditMesa = async (req, res) => {
  try {
    const mesa = await Mesa.findById(req.params.id);
    res.render('editMesa', { mesa });
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
};

exports.postEditMesa = async (req, res) => {
  const { tipoMesa, precioMesa, stockMesa } = req.body;
  try {
    await Mesa.findByIdAndUpdate(req.params.id, { tipoMesa, precioMesa, stockMesa });
    res.redirect('/mesas');
  } catch (err) {
    console.error(err);
    res.render('editMesa', { error: 'Server error' });
  }
};

exports.deleteMesa = async (req, res) => {
  try {
    await Mesa.findByIdAndDelete(req.params.id);
    res.redirect('/mesas');
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
};
