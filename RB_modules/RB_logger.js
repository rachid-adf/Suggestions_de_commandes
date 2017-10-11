var express = require('express');
var _router= express.Router();
var dv= require('./RB_divers');
var ch;
var data;
data='';

couleur=function(x){
if (x>=400) {return '\x1b[91m'} else {return '\x1b[92m'}
};


couleur_time=function(x){
    if (x>=500) {return '\x1b[91m'} else {return '\x1b[30m'}
};


affiche_erreur=function(num_err,data){
    if (num_err>=400) {return data} else {return ''}
};




_router.use(function (req, res, next) {
    var start = new Date();

    ch='';
    try{
        if (req.session.passport.user) {
            ch='User = '+req.user.id+' : '
        }
    }
    catch(err) {
        ch='User = x : '
    }

    ch=ch+dv.Left('\x1b[30m'+req.method+'       ',10)+'\x1b[94m'+req.url+'\x1b[30m';

    if(req.method=='POST') {ch=ch+' \x1b[95m'+JSON.stringify(req.body)+'\x1b[30m'};


    fn=function () {
 let time=new Date() - start;
        console.log(ch + ' --'+ couleur_time(time) +  time +'ms' + '--> '+ '\x1b[30m' + couleur(res.statusCode)  + res.statusCode + ' ' +affiche_erreur(res.statusCode,res.data) + '\x1b[30m' /*+ data*/);
        data = '';
    };
       res.on('finish',fn);
       res.on('close',fn);

        next();
      //befor finish
    });




_router.use(function (req, res, next) {
    var send = res.send;

    res.send = function (body) {
        data=data+' Send : '+JSON.stringify(body);
        send.call(this, body);
    };
    next();
});

_router.use(function (req, res, next) {
    var render = res.render;

    res.render = function( view, options, fn ) {
        data=data+' render : '+JSON.stringify(view);
        render.call( this, view, options, fn );

    };
    next();

});

_router.use(function (req, res, next) {
    var redirect = res.redirect;
    res.redirect = function( view, options, fn ) {
        data=data+' redirect : '+JSON.stringify(view);

        redirect.call( this, view, options, fn );
    };
    next();
});

module.exports=_router;