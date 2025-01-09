const express = require("express");
const app     = express();

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
];

// route to home site content
app.get('/', (request, response) => {
  response.send('<h1>The Phonebook App</h1><p>Welcome</p>');
});

// route to get all registers in persons variable
app.get('/api/persons', (request, response) => {
  response.json( persons );
});

// route to get the information for a single entry
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const personEntry = persons.find( person => person.id === id);

  if( personEntry ) {
    response.json( personEntry );
  } else {
    response.statusMessage = `Person with id ${ id } was not found.`;
    response.status(400).end();
  }
});

// route to delete a single entry
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;

  persons = persons.filter( person => person.id !== id );
  response.status(204).end();
});

// route to an info page
app.get('/info', (request, response) => {
  const numberOfEntries = persons.length;
  const requestDate     = new Date().toString();

  response.send(`
    <p>Phonebook has info for ${ numberOfEntries + (numberOfEntries === 1 ? ' person' : ' people') }.</p>
    <p>${ requestDate }</p>
  `);
});

// setup of listen port for the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${ PORT }`);
});