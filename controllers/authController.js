const Usuarios = require('../models/Usuarios');

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.getRegister = (req, res) => {
  res.render('register');
};

exports.postRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await Usuarios.findOne({ email });
    if (user) {
      return res.render('register', { error: 'User already exists' });
    }
    user = new Usuarios({ name, email, password });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.render('register', { error: 'Server error' });
  }
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Usuarios.findOne({ email });
    if (!user || user.password !== password) {
      return res.render('login', { error: 'Invalid credentials' });
    }
    req.session.user = user;
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.render('login', { error: 'Server error' });
  }
};

exports.getDashboard = (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('dashboard', { user: req.session.user });
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/dashboard');
    }
    res.redirect('/login');
  });
};
