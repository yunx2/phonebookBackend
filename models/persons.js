const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const options = {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}

mongoose.connect(process.env.MONGODB_URI, options)
.then(result => {
  console.log('connected to mongodb');
})
.catch(err => {
  console.log(err.message);
});

const personSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true, uniqueCaseInsensitive: true},
  number: {type: String, required: true, unique: false}
}, {toJSON: {transform: (doc, ret) => {
  ret.id = ret._id.toString();
  delete ret._id;
  delete ret.__v;
}}});

personSchema.plugin(uniqueValidator);

const Person = mongoose.model('Person', personSchema);

module.exports = Person;