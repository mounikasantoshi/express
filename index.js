const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
//const moment = require('moment');
const logger = require('./middleware/logger');

const app = express();

//init middleware
//app.use(logger);

//Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//homepage root
app.get('/layout', (req, res) => res.render('index'));

//members api routes
app.use('/api/members', require('./routes/api/members'));

/*
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
*/
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
