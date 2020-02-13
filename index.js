const MongoClient = require('mongodb').MongoClient; //client for mongo server
const assert = require('assert').strict;
const dboper = require('./operations'); //gives us access to the four methods from operations.js

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';    //name of database you want to connect to

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null);   //use client to connect to database, first check to make sure that the error is not null with assert

    console.log('Connected correctly to server');

    const db = client.db(dbname);   //connect to numcapsite database, use db object to access set of methods to interact with database

    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);  //if error NOT null, continue
        console.log('Dropped Collection', result);

        //insert a document into collection
        dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test"},
            'campsites', result => {
            console.log('Insert Document:', result.ops);    //ops is short for operations, contains an array with document that was inserted

            dboper.findDocuments(db, 'campsites', docs => {
                console.log('Found Documents:', docs);

                dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
                    { description: "Updated Test Description" }, 'campsites',
                    result => {
                        console.log('Updated Document Count:', result.result.nModified);

                        dboper.findDocuments(db, 'campsites', docs => {
                            console.log('Found  Documents:', docs);
                            
                            dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
                                'campsites', result => {
                                console.log('Deleted Document Count:', result.deletedCount);

                                client.close();
                            });
                        });
                    }
                );
            });
        });
    });
});