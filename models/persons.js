const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
  console.log('connected to mongodb');
})
.catch(err => {
  console.log(err.message);
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String
}, {toJSON: {transform: (doc, ret) => {
  ret.id = ret._id.toString();
  delete ret._id;
  delete ret.__v;
}}});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;