const mongoose = require('mongoose');

const args = process.argv.slice(2);

if (args.length === 0) { // check if password entered at command line
  console.log('enter a password');
  process.exit(1); // .exit method makes process exit as fast as possible without waiting for any asynchronous operations that haven't finished
  // argument to exit method is an exit code; 1 indicates failure, 0 indicates success
}

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});
const Person = mongoose.model('Person', personSchema);

if (args.length === 1) {
  Person.find({}).then(results => {
    results.forEach(person => console.log(person.name, person.number));
    process.exit();
  });
}

const [password, name, number] = args;

const connectionString = `mongodb+srv://yunyun:${password}@test-jsak1.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});

const person = new Person({ // Person is a constructor function
  name,
  number
});

person.save().then(response => {
  console.log('saved:', name, number);
  mongoose.connection.close();
});
