


var connection = require('./RB_connexion_mysql');
var divers= require('./RB_divers');

var My_passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
//var session = require('express-session');
var session = require('express-session');


// used to serialize the user for the session
My_passport.serializeUser(function(user, done) {
    done(null, user.id);

   // divers.LOG(__filename,'SerializeUser : Entré : '+JSON.stringify(user)+'  Sortie : '+user.id);
});


// used to deserialize the user

My_passport.deserializeUser(function(id, done) {


    connection.query("SELECT id,name,autorisations FROM RB_app_utilisateurs WHERE id= '" +id+ "'",function(err,rows){
        
        done(err, rows[0]);

      // console.log('DeserializeUser : Entré : '+id+' Sortie : '+ JSON.stringify(rows[0]));
      
    });
});






My_passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {

        connection.query("SELECT id,password FROM RB_app_utilisateurs WHERE username= '" + username + "'",function(err,rows){
            if (err) {  }

            if (!rows.length)
            {return done(null, false, req.flash('error', 'Pas d\'utilisateur avec ce login.')); }

            if (!( rows[0].password == password))
            {return done(null, false, req.flash('error','Le mot de passe est incorrect')); }
           // console.log('LocalStrategy : Authentification réussi : '+JSON.stringify(rows[0]));
            return done(null,rows[0]/*,req.flash('utilisateur',rows[0].name)*/);

        });

    }));








My_passport.isAuthenticated = function (req, res, next) {


    if (req.session.passport){
       // console.log('isAuthenticated Deja authentifié User : '+ req.session.passport.user + ' Session : '+JSON.stringify(req.session));

        if (req.session.passport.user)
        {return next();}
    }
    req.flash('error', 'Utilisateur non connecté ou vous n`avez pas l`access a ce contenu');        console.log('isAuthenticated : non authentifié'+ ' Session : '+JSON.stringify(req.session));
    res.redirect('/');

};

//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');
My_passport.affecter_session=function(mon_router){

    mon_router.use(session({
        name : process.env.SESSION_NAME,
        secret: process.env.SECRET_STRING,
        resave: false,
        saveUninitialized: true,
        maxAge: 900000,
        originalMaxAge : 900000,
        expires: false,
        cookie: {}
    }));

    mon_router.use(My_passport.initialize());
    mon_router.use(My_passport.session({
        name : process.env.SESSION_NAME,
        secret: process.env.SECRET_STRING,
        resave: false,
        saveUninitialized: true,
        maxAge: 900000,
        originalMaxAge : 900000,
        expires: false,
        cookie: {}
    }));




    //mon_router.use(cookieParser());
 /*  mon_router.use(session({
        name : process.env.SESSION_NAME,
        secret: process.env.SERCET_STRING,
        resave: false,
        saveUninitialized: true,
        maxAge: 900000,
        originalMaxAge : 900000,
       expires: false,
        cookie: {}
    }));
    //mon_router.use(bodyParser());
    mon_router.use(My_passport.initialize());

    mon_router.use(My_passport.session({
        name : process.env.SESSION_NAME,
        secret: process.env.SERCET_STRING,
        resave: false,
        saveUninitialized: true,
        maxAge: 900000,
        originalMaxAge : 900000,
        expires: false

    })); // persistent login sessions
*/
    mon_router.use(flash()); // use connect-flash for flash messages stored in session

};





My_passport.autentifier=My_passport.authenticate('local-login',
    { //successRedirect: 'back',
        successRedirect: '/users/home',
        failureRedirect: '/',
        failureFlash: true
    });






My_passport.deconnexion0=function(req, res){
    req.logout(); // fermme la session
    res.redirect('/');};

My_passport.deconnexion=function(req, res) {
    req.session.destroy(function () {
        console.log('deconnexion : Session detruite');
        res.redirect('/'); //Inside a callback… bulletproof!
    });
};

My_passport.affiche_login=function(req, res) {

    if(req.session) {
        if (req.session.flash) {
            res.render('login', {title: 'Authentification', message: req.session.flash.error, layout: false});
            req.session.flash.error = [];
          //  req.session.flash.session = [];

        }
        else {
            res.render('login', {title: 'Authentification', layout: false});
        }
    }
};
/**
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use('google',new GoogleStrategy({
        clientID: '309929043509-f77bvc6det47bg6tkfbru57ll9qnphvu.apps.googleusercontent.com',
        clientSecret: 'XVByjhUjRT55xabGUoxa6vMf',
        callbackURL: "http://localhost:3000/auth/google"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));


passport.use('twitter-authz', new TwitterStrategy({
        consumerKey: TWITTER_CONSUMER_KEY,
        consumerSecret: TWITTER_CONSUMER_SECRET,
        callbackURL: "http://www.example.com/connect/twitter/callback"
    },
    function(token, tokenSecret, profile, done) {
        Account.findOne({ domain: 'twitter.com', uid: profile.id }, function(err, account) {
            if (err) { return done(err); }
            if (account) { return done(null, account); }

            var account = new Account();
            account.domain = 'twitter.com';
            account.uid = profile.id;
            var t = { kind: 'oauth', token: token, attributes: { tokenSecret: tokenSecret } };
            account.tokens.push(t);
            return done(null, account);
        });
    }
));

exports.affiche_login_google=passport.authenticate('google', { scope: ['https://accounts.google.com/ServiceLogin#identifier'] });
exports.affiche_login_twitter=passport.authorize('twitter-authz', { failureRedirect: '/account' });

exports.autentifier_google=passport.authenticate('google',
    { successRedirect: '/users/demarrage',
        failureRedirect: '/',
        failureFlash: true
    });


exports.autentifier_twitter=passport.authenticate('twitter-authz',
    { successRedirect: '/users/demarrage',
        failureRedirect: '/',
        failureFlash: true
    });

    **/

module.exports=My_passport;