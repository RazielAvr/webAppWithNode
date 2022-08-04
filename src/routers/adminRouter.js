const express = require('express');
const debug = require('debug')('app:adminRouter');
const { MongoClient } = require('mongodb');
const sessions = require('../data/sessions.json');

const adminRouter = express.Router();

adminRouter.route('/').get((req, res) => {
   const uri = 'mongodb://Razielav:7X7J8LEDV253dk38@globomantics-shard-00-00.oa61v.mongodb.net:27017,globomantics-shard-00-01.oa61v.mongodb.net:27017,globomantics-shard-00-02.oa61v.mongodb.net:27017/globomantics?ssl=true&replicaSet=atlas-psofq6-shard-0&authSource=admin&retryWrites=true&w=majority';
   const url = `mongodb://localhost:27017`;
   const uri2 = 'mongodb+srv://Razielav:7X7J8LEDV253dk38@globomantics.oa61v.mongodb.net?retryWrites=true&w=majority';
   const config = {
    useNewUrlParser: true
  }
    const dbName = 'globomantics';

    (async function mongo(){
        let client;
        try {
            client = await MongoClient.connect(uri2);
            //debug('Connected to the mongo DB');
            console.log('Connected to the mongo DB');
           
           const db = client.db(dbName);

            const response = await db.collection('sessions').insertMany(sessions);
            res.json(response);

        } catch (error) {
           // debug(error.stack);
           console.log(error.stack);
        }
         // Close connection
         //client.close();
    }());
});

module.exports = adminRouter;