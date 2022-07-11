const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('tiny'));//get data from the page
app.use(express.static(path.join(__dirname, '/public/')));//look into public folder and search index.html and run only this page
const sessionsRouter = express.Router();

app.set('views', './src/views');
app.set('view engine', 'ejs');

sessionsRouter.route('/').get((req, res) => {
    res.render('sessions', {
        sessions:[
        {title: 'Session 1', description: 'this is session 1'},
        {title: 'Session 2', description: 'this is session 2'},
        {title: 'Session 3', description: 'this is session 3'},
        {title: 'Session 4', description: 'this is session 4'},
    ],
    });
});
sessionsRouter.route('/1').get((req, res) => {
    res.send('hello single sessions');
});

app.use('/sessions', sessionsRouter);

app.get('/',(req, res)=>{
    res.render('index', {title: 'Globomatics', data: ['a', 'b', 'c']});
});//this run only if not found index.html file

app.listen(PORT, ()=>{
    debug(`listening to port ${chalk.green(PORT)}`);
});


