const express = require('express');
const debug = require('debug')('app:authRouter');
const { MongoClient, ObjectID } = require('mongodb');

const passport = require('passport');

const authRouter = express.Router();

authRouter.route('/signUp').post((req, res) =>{
    const {username , password} = req.body;
    const uri2 = 'mongodb+srv://Razielav:7X7J8LEDV253dk38@globomantics.oa61v.mongodb.net?retryWrites=true&w=majority';
    const config = {
     useNewUrlParser: true
   }
     const dbName = 'globomantics';

     (async function addUser(){
        let client;
        try {
            client = await MongoClient.connect(uri2);

            const db = client.db(dbName);
            const user = {username ,password};
            const results = await db.collection('users').insertOne(user);
            debug(results);
            req.login(results.ops[0], () =>{
                res.redirect('/auth/profile');
            });
        } catch (error) {
            debug(error);
        }
        client.close();
     }());
});
authRouter.route('/signIn').get((req, res) => {
    res.render('signin');
}).post(
    passport.authenticate('local', {
    successRedirect: '/auth/profile',
    failureMessage: '/',
})
);
authRouter.route('/profile').get((req, res) =>{
    res.json(req.user);
});

module.exports = authRouter;