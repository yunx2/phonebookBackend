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

app.post('/api/persons', (req, res) => {
  const body = req.body;
  if (body.name === undefined || body.number === undefined) {
    return res.status(400).end('missing content');
  }
  Person.find({name: body.name})
    .then(result => {
      if (result.length === 0) {
        const person = new Person({
          name: body.name,
          number: body.number
        });
        person.save()
        .then(person => {
          const formatted = person.toJSON();
          res.status(201).json(formatted);
        })
        .catch(err => console.log(err));
      } else {
        const entry = result[0];
        entry['number'] = body.number;
        Person.findByIdAndUpdate(entry.id, entry, {new:true})
          .then(updated => {
            const formatted = updated.toJSON();
            res.json(formatted);
          }); 
      }
    });
});

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

app.put('api/persons/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const update = {name: body.name, number: body.number};
  Person.findByIdAndUpdate(id, update, {new: true})
    .then(updated => {
      const formatted = updated.toJSON();
      res.json(formatted);
    });
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id)
  .then(result => console.log(result))
  res.status(204).end();
});


app.listen(process.env.PORT, () => console.log(`server running at ${process.env.PORT}`));