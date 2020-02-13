const assert = require('assert').strict;    //strict version of assert

//db object, document that we want to insert, collection the document is in, callback at the end
exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection); //expecting string for collection argument
    coll.insertOne(document, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
};

exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);

    //find all documents in collection with .find(), convert them into an array with .toArray()
    coll.find().toArray((err, docs) => {
        assert.strictEqual(err, null);
        callback(docs);
    });
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);

    //document is the javascript document object to delete
    coll.deleteOne(document, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);

    //first parameter is an object that contains info about the document we want to update
    //second parameter, pass an object, "update", containing info about updates we are going to make, using an update operator, "$set"
    //third parameter passes in optional configurations, not needed, pass null
    //last parameter is a callback which gives either an error or the result
    coll.updateOne(document, { $set: update }, null, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
};