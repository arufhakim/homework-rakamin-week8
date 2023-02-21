const fs = require('fs');
const pool = require('../src/query.js');

// read file actor-seeding.sql
fs.readFile('./actor-seeding.sql', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        // run query from actor-seeding.sql (insert data to database)
        pool.query(data, (err, result) => {
            if (err){
                console.log(err);
            } else {
                console.log('Seeding Completed!');
                pool.end();
            }
        })
    }
});