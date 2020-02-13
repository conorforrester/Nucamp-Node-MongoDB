const MongoClient = require('mongodb').MongoClient; //client for mongo server
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';    //name of database you want to connect to

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null);   //use client to connect to database, first check to make sure that the error is not null with assert

    console.log('Connected correctly to server');

    const db = client.db(dbname);   //connect to numcapsite database, use db object to access set of methods to interact with database

    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);  //if error NOT null, continue
        console.log('Dropped Collection', result);

        const collection = db.collection('campsites');

        //insert a document into collection
        collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"},    
        (err, result) => {
            assert.strictEqual(err, null);
            console.log('Insert Document:', result.ops);    //ops is a property short for operations, contains array with document that was inserted

            //convert documents to an array of objects so we can console.log it
            collection.find().toArray((err, docs) => {
                assert.strictEqual(err, null);
                console.log('Found Documents:', docs);

                client.close();
            });
        });
    });
});