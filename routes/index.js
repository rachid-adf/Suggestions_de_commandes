
var express = require('express');
var router = express.Router();
var fs = require('fs');
var knex = require('./../RB_modules/RB_knex');


var MySQL = require('./../RB_modules/RB_connexion_mysql');
var auth= require('./../RB_modules/RB_autentification');







router.get('/current_user', function(req,res) {

        res.send( req.user );

});

MySQL.connnecter();




/** *************************************** **/
/** ************Autentification************ **/
/** *************************************** **/

router.get('/',auth.affiche_login);


router.post('/login',auth.autentifier);


router.get('/logout',auth.deconnexion);

/**
 router.get('/auth/google',at.affiche_login_google);
 router.post('/auth/google/callback',at.autentifier);
 **/

/** *************************************** **/
/** ****************MySQL***************** **/
/** *************************************** **/

router.get('/fr', function (req, res) {
    res.cookie('locale', 'fr', { maxAge: 900000, httpOnly: true });
    res.redirect('back');
});

router.get('/en', function (req, res) {
    res.cookie('locale', 'en', { maxAge: 900000, httpOnly: true });
    res.redirect('back');
});

router.all('/infoReq/:param', function(req,res) {

    let text='body : '+JSON.stringify(req.body)+'\n';

    text=text+'headers : '+JSON.stringify(req.headers)+'\n\n';

    text=text+'params : '+JSON.stringify(req.params)+'\n\n';

    text=text+'session : '+JSON.stringify(req.session)+'\n\n';

    //text=text+'session.passport : '+JSON.stringify(req.session.passport)+'\n\n';

    //text=text+'session.flash : '+JSON.stringify(req.session.flash)+'\n\n';

    text=text+'cookies : '+JSON.stringify(req.cookies)+'\n\n';

    text=text+'user : '+JSON.stringify(req.user);

    res.send(text);
});



/*
router.get('/read_table/:id',function(req,res) {
    if(err) {throw err}
    MySQL.get('Select * from '+req.params.id,'Lecture de la Table '+req.params.id,'tab',res);
});
*/


var msg=function(msg1,msg1){
   var obj={Err_int: msg1, Err_a_afficher: msg2}
return JSON.stringify(obj)
}

router.get('/read_table/:id',function(req,res) {

         MySQL.query('Select * from '+req.params.id, function (err, rows) {
            if (err) {return res.status(500).send(msg('MySQL ('+err.code+')','Operation effectué'));}
              res.send(rows);
            });
     });



router.get('/call_routine/:id/:retour',function(req,res) {
    MySQL.get('CALL '+req.params.id,' Done !',req.params.retour,res);
});


router.post('/call_routine/:id/:retour',function(req,res) {
    console.log(req.body[0]);
    console.log(req.body[1]);
    //res.end()
    MySQL.get("CALL "+req.params.id+"("+req.body[0]+","+req.body[1]+")"," Done !",req.params.retour,res);
});




router.get('/DB/:SQL/:retour',function(req,res) {
    MySQL.get(req.params.SQL,' Done !',req.params.retour,res);
});




router.get('/vider_creations',function(req,res) {
    MySQL.get('delete from RB_CREATIONS;','Table RB_CREATIONS vidée','tab0',res);
});






router.post('/Mettre_dans_garder', function(req,res) {
    let input = JSON.parse(JSON.stringify(req.body));

    knex('__A_garder').del().then(function() {

       return knex('__A_garder').insert(input).then(function() {console.log('Données insérées : ',input);}).catch(function(err) { return err});

    }     )
        .catch(function(err) { console.error(err); });

});


router.post('/insert_into/:table', function(req,res) {

  //  let tables_autorisees=['__A_garder'];

    //if (tables_autorisees.contains(req.params.table) ) {

    let input = JSON.parse(JSON.stringify(req.body));

    knex(req.params.table).insert(input).then(function() {
        res.end();
        console.log('Données insérées : ',input,' dans ',req.params.table);
    }).catch(function(err) { return err});


   // } else {console.log("cette table n'est pas autorisé")}
});



router.post('/delete_from/:table', function(req,res) {
   // let tables_autorisees=['__A_garder'];

   // if (tables_autorisees.contains(req.params.table) ) {


    let input = JSON.parse(JSON.stringify(req.body));

        knex(req.params.table).where(input.champ_cond,input.val_cond).del().then(function () {
          //  knex(req.params.table).where("PRD_G","3801260").del().then(function () {
            res.end();
            console.log('Données supprimé : ',input,' de ',req.params.table);

        }).catch(function (err) {return err});


   // } else {console.log("cette table n'est pas autorisé")}
});


router.get('/delete_all_from/:table', function(req,res) {
   // let tables_autorisees=['__A_garder'];

   // if (tables_autorisees.contains(req.params.table) ) {


       // let input = JSON.parse(JSON.stringify(req.body));

        knex(req.params.table).del().then(function () {
            res.end();
            console.log('Table vidée : ', req.params.table);

        }).catch(function (err) {return err});


   // } else {console.log("cette table n'est pas autorisé")}
});


router.get('/select_from/:table', function(req,res) {

    knex(req.params.table).select('*').then(function (data) {
        res.send(data);
        console.log('Table chargée : ', req.params.table);

    }).catch(function (err) {return err});

});



router.post('/update_mysql', function(req,res) {

    var input = JSON.parse(JSON.stringify(req.body));

    var  coresponding= {
        Dep : input.Dep,
        Groupe : input.Groupe,
        Ref1 : input.Ref1,
        Ref3 : input.Ref3,
        Produit : input.Produit,
        Desc_fr : input.Desc_fr,
        Desc_en : input.Desc_en,
        Four : input.Four,
        Cost : input.Cost,
        Qte_core : input.Qte_core,
        has_env_fee : input.has_env_fee,
        Prd_cons: input.Prd_cons,
        Statut: input.Statut
    };

    MySQL.post("UPDATE RB_CREATIONS set  ? WHERE id= ?",'Les modification sur la table RB_CREATIONS on etait sauvegarder',
        coresponding,
        input.id,
        'msg',res);

});




router.post('/send_info', function(req,res) {

var input = JSON.parse(JSON.stringify(req.body));
Requete_SQL="Call RB_app_changement_parametres('"+input.Nb_jours_a_charger+"','"+input.Taux_de_change+"','"+req.user.name+"')";

MySQL.query(Requete_SQL, function (err, rows) {

        if (err) {return res.status(500).send('MySQL ('+err.code+')');}
       //return res.status(200).send('MySQL (Operation effectuée)');
        res.send('MySQL (Operation effectuée)')
  
});


});

router.post('/update_mysql2', function(req,res) {

    var input = JSON.parse(JSON.stringify(req.body));

    var  coresponding= {

        valide: input.valide
    };

    MySQL.post("UPDATE RB_CREATIONS set  ? WHERE id= ?",'Les modification sur la table RB_CREATIONS on etait sauvegarder',
        coresponding,
        input.id,
        '',res);

});





'use strict';
const nodemailer = require('nodemailer');





// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'racben.mail@gmail.com',
        pass: 'str12345'
    }
});




router.get('/send_mail0', function(req,res) {


    knex('myset').select('*').then(function (data) {

        let mailOptions = {
            from: '"ADF bot 👻"', // sender address
            to:  'racben.mail@gmail.com',//'rachid.benseba@adfdiesel.com', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world ?', // plain text body
            html: '<b>Hello world ?</b>' , // html body
             attachments: [
             {   // utf-8 string as an attachment
             filename: 'fichier.csv',
             content : new Buffer(JSON.stringify(data),'utf-8')
             }]
        };



        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            //res.end();
            console.log('Email envoyé : ', info.messageId, info.response);
            res.redirect('back');
        });



    }).catch(function (err) {return err});



});

router.get('/send_mail', function(req,res) {




        let mailOptions = {
            from: '"ADF bot 👻"', // sender address
            to:  'racben.mail@gmail.com',//'rachid.benseba@adfdiesel.com', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world ?', // plain text body
            html: '<b>Hello world ?</b>' , // html body
            attachments: [
                {   // utf-8 string as an attachment
                    filename: 'Nom de fichier',
                    path: __dirname+'/../fichiers_a_envoyer/Fichier.csv'
                }]
        };



        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            //res.end();
            console.log('Email envoyé : ', info.messageId, info.response);
            res.redirect('back');
        });







});


router.get('/csv', function(req,res) {


    knex('myset').select('*').then(function (data) {

        console.log('Table chargée : ', req.params.table);


        fs.writeFile('fichiers_a_envoyer/Fichier.csv', JSON.stringify(data), 'utf8', function (err) {
            if (err) {
                console.log('Some error occured - file either not saved or corrupted file saved.');
            } else{
                console.log('It\'s saved!');
            }
        });
        res.redirect('back');

    }).catch(function (err) {return err});



});



router.get('/test-msexcel-builder', function(req,res) {
/*
    var Workbook = require('xlsx-workbook').Workbook;

    var workbook = new Workbook();
    workbook.save("Revenue-Summary");
*/

    //var excelbuilder = require('msexcel-builder');
    var excelbuilder = require('msexcel-builder-colorfix');


        // Create a new workbook file in current working-path
        var workbook = excelbuilder.createWorkbook('./fichiers_a_envoyer/', 'sample.xlsx')

    // Create a new worksheet with 10 columns and 12 rows
    var sheet1 = workbook.createSheet('sheet1', 10, 12);

    // Fill some data

    for (var i = 1; i <= 5; i++)
    {
        sheet1.set(i, 1, 'test'+i);
        sheet1.fill(i, 1, {type:'solid',fgColor:'FEEAB3',bgColor:'FEEAB3'});

    }



    var sheet2 = workbook.createSheet('sheet2', 5, 8);


    // Save it
    workbook.save(function(ok){
        if (!ok)
            workbook.cancel();
        else
            console.log('congratulations, your workbook created');
    });




    res.redirect('back');


});



module.exports = router;

