var express = require('express');
var _router= express.Router();
var dv= require('./RB_divers');
var ch;


couleur=function(x){
if (x>=400) {return 31} else {return 32}
};





//Middleware pour toutes les page (pour le test seuelememt)
_router.use(function (req, res, next) {


    try{
        if (req.session.passport.user) {
            //ch='User = '+req.session.passport.user+' : '
            ch='User = '+req.user.id+' : '
            //ch='User = '+req.user.name+' : '
            //ch=JSON.stringify(req.headers)

        }
    }
    catch(err) {
        ch='User = x : '
    }




    ch=ch+dv.Left('\x1b[37m'+req.method+'       ',10)+ req.url;

    if(req.method=='POST') {ch=ch+' \x1b[35m'+JSON.stringify(req.body)+'\x1b[37m'};
    ch=ch+'  -->  ';


    //console.error(req.method+' '+ req.url+' req body : '+req.body);
  //  console.error(req);
    next();
});
/*
_router.use(function (req, res, next) {
    function afterResponse() {
        res.removeListener('finish', afterResponse);
        res.removeListener('close', afterResponse);

        let ch;
        ch='';
        try{
            if (req.session.passport.user) {
                ch='User = '+req.user.id+' : '
            }
        }
        catch(err) {
            ch='User = x : '
        }

        ch=ch+dv.Left('\x1b[37m'+req.method+'       ',10)+ req.url;

        if(req.method=='POST') {ch=ch+' \x1b[35m'+JSON.stringify(req.body)+'\x1b[37m'};
        ch=ch+'  -->  '+'\x1b['+couleur(res.statusCode)+'m'+res.statusCode+'\x1b[37m';
        // console.log(ch+' send:  '+ res.body);


    }

    res.on('finish', afterResponse);
    res.on('close', afterResponse);
    //console.log(JSON.stringify(res.body));

    // console.log(' send:  '+ res.body);


    //ch='';
    next();
    // action before request
    // eventually calling `next()`
});
*/
_router.use(function (req, res, next) {
    var send = res.send;
    res.send = function (body) {

        console.log(ch+'\x1b['+couleur(res.statusCode)+'m'+res.statusCode+'\x1b[37m'+' send:  '+ JSON.stringify(body));
        send.call(this, body);
    };
    next();
});

_router.use(function (req, res, next) {
    // grab reference of render
    var render = res.render;
    // override logic
    res.render = function( view, options, fn ) {
        ch=ch+'\x1b['+couleur(res.statusCode)+'m'+res.statusCode+'\x1b[37m'+' render:  '+ JSON.stringify(view)+' --> ';
        render.call( this, view, options, fn );
    };
    next();


});

_router.use(function (req, res, next) {
    var redirect = res.redirect;
    // override logic
    res.redirect = function( view, options, fn ) {

        console.log(ch+'\x1b['+couleur(res.statusCode)+'m'+res.statusCode+'\x1b[37m'+' redirect : '+ JSON.stringify(view));
        redirect.call( this, view, options, fn );
    };
    next();
});

module.exports=_router;