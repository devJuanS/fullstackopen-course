const express = require("express");
const morgan  = require('morgan');
const cors    = require('cors');
const Person  = require('./models/person');
const app     = express();

const HTTP_SUCCESS_REQUEST    = 200;
const HTTP_NO_CONTENT_TO_SEND = 204;
const HTTP_BAD_REQUEST        = 400;
const HTTP_NOT_FOUND          = 404;

// make Express to show static content
app.use( express.static('dist') );

// access the data easily, using Express json-parser
app.use( express.json() );

// enable the use of resources not in the same origin domain
app.use( cors() );

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

// route to get all registers in people collection in MongoDB
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => response.json( persons ));
});

// route to get the information for a single entry
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => response.json( person ));
});

// TODO: modify according to the usage of MongoDB
// route to delete a single entry in persons variable
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;

  persons = persons.filter( person => person.id !== id );
  response.status(HTTP_NO_CONTENT_TO_SEND).end();
});

// route to add a new entry in people collection in MongoDB
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

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then(savedPerson => response.json( savedPerson ));
});

// TODO: modify according to the usage of MongoDB
// route to an info page
app.get('/info', (request, response) => {
  const numberOfEntries = persons.length;
  const requestDate     = new Date().toString();

  response.send(`
    <p>Phonebook has info for ${ numberOfEntries + (numberOfEntries === 1 ? ' person' : ' people') }.</p>
    <p>${ requestDate }</p>
  `);
});

// middleware to response when a unknown route is requested
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
}

app.use(unknownEndpoint);

// setup of listen port for the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${ PORT }`);
});