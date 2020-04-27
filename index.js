const express = require('express');
require('dotenv').config();
const Person = require('./models/persons')
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

morgan.token('content', (req, res) => {
  return JSON.stringify(req.body);
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'));
app.use(cors());
app.use(express.static('build'));
app.use(express.json());


// let persons = [
  //   { 
  //     "name": "Arto Hellas", 
  //     "number": "040-123456",
  //     "id": 1
  //   },
  //   { 
  //     "name": "Ada Lovelace", 
  //     "number": "39-44-5323523",
  //     "id": 2
  //   },
  //   { 
  //     "name": "Dan Abramov", 
  //     "number": "12-43-234345",
  //     "id": 3
  //   },
  //   { 
  //     "name": "Mary Poppendieck", 
  //     "number": "39-23-6423122",
  //     "id": 4
  //   }
  // ];

  // app.get('/info', (req, res) => {
  //   const entries = persons.length;
  //   const time = new Date();
  //   const content = `<div>phonebook has info for ${entries}</div><br />${time}`;
  //   res.send(content);
  // });

  

  app.get('/api/persons', (req, res) => {
    Person.find({})
      .then(persons => {
        const formatted = persons.map(p => p.toJSON());
        res.json(formatted);
      });
  });

  app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    Person.findById(id)
      .then(result => {
        if (result) { // found a match, send data
          const formatted = result.toJSON();
          res.json(formatted);
        } else {
          res.status(404).end(); // no data matching id in db
        }
      })
      .catch(err => { // id doesn't match mongo identifier format
        next(err);
      });
  });

  app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    Person.findByIdAndRemove(id)
    .then(result => console.log(result))
    res.status(204).end();
  });

app.listen(process.env.PORT, () => console.log(`server running at ${process.env.PORT}`));