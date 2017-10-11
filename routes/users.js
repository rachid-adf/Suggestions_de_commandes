
var express = require('express');
var router = express.Router();
var MySQL = require('./../RB_modules/RB_connexion_mysql');


router.get('/', function(req, res) {

    if(req.session.flash)
    {
        res.render('login',{ title: 'Authentification', message : req.session.flash.error , layout: false});
        req.session.flash.error=[];}
    else{
        res.render('login',{ title: 'Authentification' , layout: false} );}

});
/*
router.get('/paramaitres_generals', function(req, res) {

 res.render('paramaitres_generals/paramaitres_generals', { title: res.__('paramaitres_generals'), user: req.user.name });

});
*/

router.get('/:page', function(req, res) {
/*
    MySQL.query("SELECT autorisations FROM RB_app_utilisateurs WHERE id= '" + req.user.id + "'",function(err,data) {
        if(err) {B=false; console.log('erreur MySQL')}
        else
        {B=data.indexOf('traitement_demande')>=0;  console.log('fait')}
    });
*/

    switch (req.params.page){
    case 'traitement_demande' :
        B=req.user.autorisations.indexOf('traitement_demande')>=0;
        break;
        default : B=true;
    }

    if (B)  {res.render(req.params.page, { title: res.__(req.params.page), user: req.user.name });}
    else {res.redirect('back')}

    // console.log(req.params.page, "affichée");
});





/*
router.get('/creation_produits0', function(req, res) {

    res.render('creation_produits0', { title: 'Creation de produit', user: req.session.flash.utilisateur } );

});


router.get('/paramaitres_dep', function(req, res) {

    res.render('paramaitres_dep', { title: 'Paramaitres depepartement', user: req.session.flash.utilisateur } );

});




router.get('/numeros_a_detruire', function(req, res) {

    res.render('numeros_a_detruire', { title: 'Numeros à deteruire', user: req.session.flash.utilisateur } );

});


router.get('/infos_fournisseurs', function(req, res) {

    res.render('infos_fournisseurs', { title: 'Infos fournisseurs', user: req.session.flash.utilisateur } );

});



router.get("/home",function(req, res) {
    divers.log(__stack,res.__('Acceuil'));

    res.render('home', { title: res.__('Acceuil'), user: req.session.flash.utilisateur  } );


});*/






/* GET users listing. */
/*router.get('/', function(req, res, next) {

    res.send('respond with a resource');

});

*/



/** ************** **/
/** Debut exemple  **/
/** ************** **/
/*
router.get('/menu_table', function(req,res,x) {
    divers.log(__stack,'1-Suivant');
    x();
}, function (req, res, x) {
    divers.log(__stack,'2-Request Type:', req.method)
    x()
}, function (req, res, x) {
    divers.log(__stack,'3-Request URL:', req.originalUrl);
    x()
}, function (req, res, next) {
    //res.redirect('/produit');
    divers.log(__stack,'4-Suivant');
    next();
});

*/

/** ************** **/
/** Fin exemple    **/
/** ************** **/






 /*

router.get('/menu_table', function(req,res,next) {
    res.render('principal', { Titre_menu: 'Creation de produit', user: req.session.flash.utilisateur } );
});

*/
module.exports = router;