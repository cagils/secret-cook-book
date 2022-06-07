import mongoose from 'mongoose';
import recipeModel from '../models/recipeModel';

const readyStates = {
  disconnected: 0,
  connected: 1,
  connecting: 2,
  disconnecting: 3,
};

let pendingPromise = null;

let models = {
  recipe: recipeModel,
};

const withDb = (fn) => async (req, res) => {
  const next = () => {
    req.models = models;
    return fn(req, res);
  };

  const { readyState } = mongoose.connection;

  if (readyState === readyStates.connected) {
    return next();
  } else if (pendingPromise) {
    await pendingPromise;
    return next();
  }

  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error('Define the MONGODB_URI environmental variable');
  }

  const username = 'scb';
  const password = 'scb123';
  const cluster = 'scbcluster';
  const dbname = 'SCB';

  pendingPromise = mongoose.connect(
    `mongodb+srv://${username}:${password}@${cluster}.jswdp.mongodb.net/${dbname}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error: '));
  db.once('open', function () {
    console.log('Connected successfully');
  });

  try {
    await pendingPromise;
  } finally {
    pendingPromise = null;
  }

  console.log('Mongoose connection established');

  return next();
};

export default withDb;
