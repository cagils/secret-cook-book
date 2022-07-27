import mongoose from 'mongoose';

import models from '@/models/models';

const readyStates = {
  disconnected: 0,
  connected: 1,
  connecting: 2,
  disconnecting: 3,
};

let pendingPromise = null;

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

  const PASS = process.env.MONGODB_PASS;
  if (!PASS) {
    throw new Error('Define the MONGODB_PASS environmental variable');
  }
  const USER = process.env.MONGODB_USER;
  if (!USER) {
    throw new Error('Define the MONGODB_USER environmental variable');
  }
  const CLUSTER = process.env.MONGODB_CLUSTER;
  if (!CLUSTER) {
    throw new Error('Define the MONGODB_CLUSTER environmental variable');
  }
  const DBNAME = process.env.MONGODB_DBNAME;
  if (!DBNAME) {
    throw new Error('Define the MONGODB_CLUSTER environmental variable');
  }
  const URI = process.env.MONGODB_URI;
  if (!URI) {
    throw new Error('Define the MONGODB_URI environmental variable');
  }

  console.log('Connecting to ' + URI);

  pendingPromise = mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

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
