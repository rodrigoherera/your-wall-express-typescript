import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/PostsDB', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log("Database is ON!")
});

export default db;