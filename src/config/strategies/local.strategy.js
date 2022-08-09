const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:localStrategy');
module.exports = function localStrategy(){
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    (username, password, done) =>{
        const uri2 = 'mongodb+srv://Razielav:7X7J8LEDV253dk38@globomantics.oa61v.mongodb.net?retryWrites=true&w=majority';
        const config = {
         useNewUrlParser: true
       }
         const dbName = 'globomantics';
         (async function validateUser(){
            let client;
            try {
                client = await MongoClient.connect(uri2);
                 //debug('Connected to the mongo DB');
                 console.log('Connected to the mongo DB');
                const db = client.db(dbName);
                const user = await db.collection('users').findOne({username});
               
                if(user && user.password === password){
                    done(null, user);
                }
                else{
                    done(null, false);
                }

            } catch (error) {
                done(error, false);
            }
            client.close();
         }());
    }));
};