const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('tiny'));//get data from the page
app.use(express.static(path.join(__dirname, '/public/')));//look into public folder and search index.html and run only this page

app.get('/',(req, res)=>{
    res.send('Hello from my app');
});//this run only if not found index.html file

app.listen(3000, ()=>{
    debug(`listening on port ${chalk.green('3000')}`);
});


