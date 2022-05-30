import mongoose, { models, model, ConnectOptions } from 'mongoose';
import { recipesSchema } from '../models/recipe';

const connectDb = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error('Define the MONGODB_URI environmental variable');
  }

  const username = 'scb';
  const password = 'scb123';
  const cluster = 'scbcluster';
  const dbname = 'SCB';

  mongoose.connect(
    `mongodb+srv://${username}:${password}@${cluster}.jswdp.mongodb.net/${dbname}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions
  );

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error: '));
  db.once('open', function () {
    console.log('Connected successfully');
  });

  console.log('Mongoose connection established');

  const recipesModel =
    mongoose.models.recipes || mongoose.model('recipes', recipesSchema);

  return { recipesModel };
};

export { connectDb };
