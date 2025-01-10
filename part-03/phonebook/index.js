const express = require("express");
const morgan  = require('morgan');
const app     = express();

const HTTP_SUCCESS_REQUEST    = 200;
const HTTP_NO_CONTENT_TO_SEND = 204;
const HTTP_BAD_REQUEST        = 400;
const HTTP_NOT_FOUND          = 404;

// To access the data easily, using Express json-parser
app.use( express.json() );

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

// morgan logger middleware
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :content-post')
);
// morgan token that show the data sent in HTTP POST requests
morgan.token('content-post', 
  (request, response) => request.method === 'POST' ? JSON.stringify(request.body) : null
);

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
    response.status(HTTP_NOT_FOUND).end();
  }
});

// route to delete a single entry in persons variable
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;

  persons = persons.filter( person => person.id !== id );
  response.status(HTTP_NO_CONTENT_TO_SEND).end();
});

/**
 * Generate an id number
 * @returns {String} random Id
 */
const generateId = () => {
  const randomId = Math.floor( Math.random() * 1000 );

  return String( randomId );
}

// route to add a new entry in persons variable
app.post('/api/persons', (request, response) => {
  const body = request.body;

  if( !body.name ) {
    return response.status(HTTP_BAD_REQUEST).json({
      error: 'name is missing.'
    });
  }
  if( !body.number ) {
    return response.status(HTTP_BAD_REQUEST).json({
      error: 'number is missing.'
    });
  }
  const isDuplicateName = persons.some( person => person.name === body.name );
  if( isDuplicateName ) {
    return response.status(HTTP_BAD_REQUEST).json({
      error: 'name must be unique.'
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat( person );
  response.json( person );
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