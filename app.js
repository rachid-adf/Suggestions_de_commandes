require('dotenv').config();

var dv = require('./RB_modules/RB_divers');
var _i18n = require('./RB_modules/RB_i18n');
var auth = require('./RB_modules/RB_autentification');
var error = require('./RB_modules/RB_error');
var My_logger = require('./RB_modules/RB_logger');
var routes = require('./routes/index');
var users = require('./routes/users');


var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicons = require('connect-favicons');
var logger = require('morgan');
var path =require('path');
var fs = require('fs');
var express = require('express');

//var flash = require('connect-flash');
var app = express();



app.use(favicons(__dirname + '/client/_main/ico'));


// view engine setup

app.set('views', 
[__dirname + '/client',
 __dirname + '/client/_main',
 __dirname + '/client/login',
 __dirname + '/client/creation_produits',
 __dirname + '/client/parametres',
 __dirname + '/client/liste_complete',
 __dirname + '/client/traitement_demande']);


app.set('view engine', 'hbs');

//app.set('view options', { layout: 'other' });

/*
morganOptions = {
    skip: function (req, res) { return res.statusCode < 400}
};

app.use(logger('dev', morganOptions));
*/

//app.use(logger('dev'));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



_i18n.config_and_init(app);


app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'node_modules')));


/*
app.use(session({
    name : process.env.SESSION_NAME,
    secret: process.env.SECRET_STRING,
    resave: false,
    saveUninitialized: true,
    maxAge: 900000,
    originalMaxAge : 900000,
    expires: false,
    cookie: {}
}));
*/
auth.affecter_session(app);




//Middleware pour page qui on besoin d'autentification
app.use('/users',auth.isAuthenticated,function (req, res, next) {
    //console.error(req);
    next();
});




app.use(My_logger);

app.use('/', routes); // parcoure tout les routes de index
app.use('/users', users); // parcoure tout les routes de users



error.middleware_apply(app);

_i18n.middleware_apply(app);



/*
var request = require('request');
var requestLoop = setInterval(function(){
    request({
        url: "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,CAD,EUR,BAT",
        method: "GET",
        timeout: 5000,
        followRedirect: true,
        maxRedirects: 10
    },function(error, response, body){
        if(!error && response.statusCode == 200){
            console.log(body);
        }else{
            console.log('error' + response.statusCode);
        }
    });
  }, 3000);
  */

var server = app.listen(process.env.PORT, function () {
//dv.code_couleur();
dv.log_server(server);

});

