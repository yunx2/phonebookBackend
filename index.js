const express = require('express');
const app = express();

const port = 3001;

app.use(express.json());

let persons = [
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": 3
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": 4
    }
  ];

  app.get('/info', (req, res) => {
    const entries = persons.length;
    const time = new Date();
    const content = `<div>phonebook has info for ${entries}</div><br />${time}`;
    res.send(content);
  });

  app.get('/api/persons', (req, res) => {
    res.json(persons);
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
    const newId = Math.floor(Math.random() * Math.floor(100000));
    const newEntry = {name: body.name, number: body.number, id: newId};
    persons = persons.concat(newEntry);
    res.status(201).send(newEntry);
  });


app.listen(port, () => console.log(`server running at ${port}`));