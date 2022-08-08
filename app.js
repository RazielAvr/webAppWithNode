const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const PORT = process.env.PORT || 3000;
const app = express();
const sessionsRouter = require('./src/routers/sessionsRouter');
const adminRouter = require('./src/routers/adminRouter');
const authRouter = require('./src/routers/authRouter');

app.use(morgan('tiny'));//get data from the page
app.use(express.static(path.join(__dirname, '/public/')));//look into public folder and search index.html and run only this page
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({secret: 'globomantics'}));

require('./src/config/passport.js')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');



app.use('/sessions', sessionsRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter );

app.get('/',(req, res)=>{
    res.render('index', {title: 'Globomatics', data: ['a', 'b', 'c']});
});//this run only if not found index.html file

app.listen(PORT, ()=>{
    debug(`listening to port ${chalk.green(PORT)}`);
});


