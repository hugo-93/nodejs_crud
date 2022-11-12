const express = require('express');
const bodyParser = require('body-parser');
var session = require('express-session');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const app = express();

// para que express envíe y reciba los datos en formato JSON
// se agrega una dependencia body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

// conexión a base de datos
mongoose.connect('mongodb://localhost:27017/sicef')
.then(() => console.log('Base de datos conectada.'))
.catch(e => console.log(e));

// motor de plantilla
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// rutas web
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index', {name: 'Hugo'});
});

app.use('/entes', require(__dirname + '/router/Entes'));

// iniciar servidor Express
app.listen(PORT, function() {
    console.log('Oyendo en el puerto ' + PORT);
});
