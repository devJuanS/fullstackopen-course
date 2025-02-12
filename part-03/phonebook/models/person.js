const mongoose = require('mongoose');

// connect to the MongoDB
process.loadEnvFile();
const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose.connect(url)
  .then(result => console.log('connected to MongoDB.'))
  .catch(error => console.log('error connecting to MongoDB', error.message));

// define the schema to use for the data
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// format the objects returned by Mongoose
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

// export the model based on the defined schema
module.exports = mongoose.model('Person', personSchema);
