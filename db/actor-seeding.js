const fs = require('fs');
const pool = require('../src/query.js');

fs.readFile('./actor-seeding.sql', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
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