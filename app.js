const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('tiny'));//get data from the page
app.use(express.static(path.join(__dirname, '/public/')));//look into public folder and search index.html and run only this page


app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/',(req, res)=>{
    res.render('index', {title: 'Globomatics', data: ['a', 'b', 'c']});
});//this run only if not found index.html file

app.listen(PORT, ()=>{
    debug(`listening to port ${chalk.green(PORT)}`);
});


