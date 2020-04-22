const express = require('express');
const app = express();

const port = 3001;

const persons =[
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


app.listen(port, () => console.log(`server running at ${port}`));