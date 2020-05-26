const express = require('express');
const path = require('path');
//const moment = require('moment');
const logger = require('./middleware/logger');
const members = require('./members');

const app = express();

//init middleware
app.use(logger);

//Get all members
app.get('/api/members', (req, res) => res.json(members));

//Get single number
app.get('/api/members/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `no member with the id of ${req.params.id}` });
  }
});

//set static folder
app.use(express.static(path.join(__dirname, '/public')));

/*
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
*/
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
