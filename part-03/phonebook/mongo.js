const mongoose = require('mongoose');

// validate if password was given as argument
if( process.argv.length < 3 ) {
  console.log('give password as argument');
  process.exit(1);
}

// connection parameters to the MongoDB
const mongodbParam = {
  username: 'jsebast32',
  password: encodeURIComponent(process.argv[2]),
  cluster:  'cluster0',
  appName:  'Cluster0',
  retryWrites: 'true',
};

const url =
`mongodb+srv://${ mongodbParam.username }:${ mongodbParam.password }@${ mongodbParam.cluster }.yak54.mongodb.net/?retryWrites=${ mongodbParam.retryWrites }&w=majority&appName=${ mongodbParam.appName }`;

mongoose.set('strictQuery',false);
mongoose.connect(url);

// define the schema to use for the data
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// create the model based on the defined schema
const Person = mongoose.model('Person', personSchema);

// fetch all the objects in the collection
if( process.argv.length === 3 ) {
  Person.find({})
    .then(result => {
      result.forEach( person => console.log( person ));
      mongoose.connection.close();
    });
}
// save an object on database
if( process.argv.length === 5 ) {
  const person = new Person({
    name:   process.argv[3],
    number: process.argv[4],
  });

  person.save()
    .then(result => {
      console.log(`Person ${ result.name } was saved.`);
      mongoose.connection.close();
    });
}
