const express = require('express');
const sessionsRouter = express.Router();
const debug = require('debug')('app:sessionsRouter');
const { MongoClient, ObjectID } = require('mongodb');
const speakerService = require('../services/speakerService');

const sessions = require('../data/sessions.json');

sessionsRouter.use((req, res, next) => {
  if(req.user){
    next();
  }
  else{
    res.redirect('/auth/signIn');
  }
});

sessionsRouter.route('/').get((req, res) => {
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
  
             const sessions = await db.collection('sessions').find().toArray();
             res.render('sessions',{sessions});
 
         } catch (error) {
            //debug(error.stack);
            console.log(error.stack);
         }
          // Close connection
          client.close();
     }());
});
sessionsRouter.route('/:id').get((req, res) => {
    const id = req.params.id;
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
  
             const session = await db.collection('sessions').findOne({_id: new ObjectID(id)});
             const speaker = await speakerService.getSpeakerById(session.speakers[0].id);

             session.speaker = speaker.data;
             res.render('session', {
                session
            });
 
         } catch (error) {
            //debug(error.stack);
            console.log(error.stack);
         }
          // Close connection
          client.close();
     }());
    
});

module.exports = sessionsRouter;