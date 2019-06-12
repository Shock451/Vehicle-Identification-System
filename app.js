var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var passport = require('passport');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;

var User = require('./models/user');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

mongoose.connect('mongodb+srv://kele:11kele22@vis-1yl6n.gcp.mongodb.net/cardentify?retryWrites=true&w=majority', { useNewUrlParser: true });

var app = express(); 

var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        foo: function () { return 'FOO!'; }, // to be used later
        bar: function () { return 'BAR!'; },
        when: function (operand_1, operator, operand_2, options) {
            var operators = {
                'eq': function (l, r) { return l == r; },
                'noteq': function (l, r) { return l != r; },
                'gt': function (l, r) { return Number(l) > Number(r); },
                'or': function (l, r) { return l || r; },
                'and': function (l, r) { return l && r; },
                '%': function (l, r) { return (l % r) === 0; }
            }, result = operators[operator](operand_1, operand_2);

            if (result) return options.fn(this);
            else return options.inverse(this);
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: 'secret',
    maxAge: new Date(Date.now() + 3600000),
    store: new MongoStore(
        { mongooseConnection: mongoose.connection }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = app;
