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
app.use(express.json());
app.use(express.static('build'));

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

  app.get('/info', (req, res) => {
    const entries = persons.length;
    const time = new Date();
    const content = `<div>phonebook has info for ${entries}</div><br />${time}`;
    res.send(content);
  });

  app.get('/api/persons', (req, res) => {
    Person.find({})
      .then(data => {
        console.log(data);
        res.json(data);
      });
  });

  app.get('/api/persons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const result = persons.find(p => p.id === id);
    if (result) {
    res.send(result);
    } else {
      res.status(404).send(`entry for id#${id} not found`);
    }
  });

  app.delete('/api/persons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    persons = persons.filter(p => p.id !== id);
    console.log(persons);
    res.status(204).end();
  });

  app.post('/api/persons', (req, res) => {
    const body = req.body;
    // if (Person.find({name: body.name})) {
    //   return res.status(400).send(`error: name must be unique`);
    // }
    if (body.name === undefined || !body.number === undefined) {
      return res.status(400).send(`error: content missing`);
    }

    const newEntry = new Person({
      name: body.name,
      number: body.number
    });

    newEntry.save()
      .then(data => {
        res.status(201)
          .json(data)
      })
  });

app.listen(process.env.PORT, () => console.log(`server running at ${process.env.PORT}`));