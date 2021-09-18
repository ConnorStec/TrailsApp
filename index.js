'use strict';

require('dotenv').config();
const ip = require('ip');

process.on('unhandledRejection', function (reason, p) {
  console.error(`Possible unhandled rejection at: Promise ${JSON.stringify(p)}, Reason ${reason}`);
});

const express = require('express');
const Pool = require('pg').Pool;

const app = express();
app.use(express.json());

const port = 3000;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: 'localhost',
  database: process.env.DB_NAME,
  max: 10,
  idleTimeoutMillis: 1000
});

// Used in SQL statement INSERTs
const TRAIL_FIELDS = [
  'name',
  'url',
  'thumbUrl',
  'length',
  'elevationGain',
  'description',
];

// serves the production frontend
app.use('/', express.static(`${__dirname}/browser/dist/`));

app.listen(port, () => {
  app.get('/', (req, res) => { res.send('Hello api') });
  app.route('/api/trails')
    .all((req, res, next) => {
      return next();
    })
    .get((req, res) => {
      pool.query('SELECT * FROM trails')
        .then((result) => {
          return res.send(result.rows);
        })
    })
    .post((req, res) => {
      const { trails } = req.body;
      const promises = trails.map(createInsertPromise);
      return Promise.all(promises).then((success) => {
        console.log('success', success);
        return res.status(201).send(success);
      }).catch((err) => {
        console.log('Query err', err);
        return res.sendStatus(500);
      });
    });

  app.route('/api/trails/:id')
    .all((req, res, next) => {
      pool.query({
        text: `SELECT * FROM trails WHERE id = $1`,
        values: [req.params.id]
      }).then((result) => {
        req.trail = result.rows[0];
        return next();
      })
    })
    .get((req, res) => {
      return res.send(req.trail);
    })
    .put((req, res) => {
      pool.query({
        text: `
          UPDATE trails
          SET ${createUpdateStatements(req.trail)}
          WHERE id = $1
        `,
        values: []
      })
    })


  console.log('App listening on port ' + port);
  console.log('Local IP: ' + ip.address());
});


function createInsertPromise(resource) {
  // errors will be caught by the Promise.all catch, don't reject here
  return new Promise((resolve) => {
    return pool.query({
      text: `
        INSERT INTO trails
        (${TRAIL_FIELDS.map(f => `"${f}"`).join(', ')})
        VALUES
        ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `,
      values: TRAIL_FIELDS.map(f => resource[f])
    }).then((result) => {
      return resolve(result.rows[0]);
    });
  });
}

// take in an object and output a parameterized query string like '"boop"=$1, "snoot"=$2'
function createUpdateStatements(resource) {
  return TRAIL_FIELDS.map((f, index) => {
    return `"${f}"=$${index}`;
  });
}