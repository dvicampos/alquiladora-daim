const express = require('express');
const mongoose = require('mongoose');
const { create } = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const inflableRoutes = require('./routes/inflableRoutes');
const lonaRoutes = require('./routes/lonaRoutes');
const sillaRoutes = require('./routes/sillaRoutes');
const mesaRoutes = require('./routes/mesaRoutes');
const manteleriaRoutes = require('./routes/manteleriaRoutes');
const ventasRoutes = require('./routes/ventasRoutes');
const stockRoutes = require('./routes/stockRoutes');
// const ventasRoutes = require('/routes/ventasRoutes');


const app = express();
app.use('/api', stockRoutes);

// Conectar a MongoDB Atlas
// ARno0192
//david
const MONGO_URI = "mongodb+srv://david:ARno0192@cluster0.runro.mongodb.net/app?retryWrites=true&w=majority&appName=Cluster0"
// const MONGO_URI = "mongodb+srv://davecamp:R8dy0LYFUlCh54lp@cluster0.fdwpzyb.mongodb.net/miapp?retryWrites=true&w=majority";
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Handlebars Middleware
const hbs = create({ 
  defaultLayout: 'main', 
  extname: '.hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Session Middleware
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

// Routes
app.use('/', authRoutes);
app.use('/', inflableRoutes);
app.use('/', lonaRoutes);
app.use('/', sillaRoutes);
app.use('/', mesaRoutes);
app.use('/', manteleriaRoutes);
app.use('/', ventasRoutes);
app.use('/ventas', ventasRoutes);


app.use((req, res, next) => {
  res.status(404).render(path.join(__dirname, 'views/error'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));




// davidcampos
// davidcampos@gmail.com