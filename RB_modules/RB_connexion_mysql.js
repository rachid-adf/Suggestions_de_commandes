var divers= require('./RB_divers');
var mysql= require('mysql');



var con = mysql.createConnection({
    host     : process.env.MYSQL_HOST,
    port     : process.env.MYSQL_PORT,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASS,
    database : process.env.MYSQL_DB

});




con.get=function(requete,message,retour,res) {

        con.query(requete, function (err, rows) {

            if (err) {
                console.error('Erreur MySQL : ' + err.code);
                res.send(res.__('Operation non éffectuée'));//ne pas re-envoyer l'erreur MySQL au client
            }
            else {
                //console.log(message);
                switch(retour){
                    case 'tab' : res.send(rows); break;
                    case 'tab0' : res.send(rows[0]); break;
                    case 'msg' : res.send(res.__(message));
                }

            }
        });
    };



con.post=function(requete,message,var1,var2,retour,res) {
    con.query(requete, [var1, var2], function (err, rows) {

        if (err) {
           // console.log_err( 'Erreur MySQL : ' + err.code);
          /*  res.send(err)*/
          return res.status(500).send('MySQL ('+err.code+')');
            //res.send(res.__('Operation non éffectuée'));//ne pas re-envoyer l'erreur MySQL au client
        }
     
            console.log(message);
            switch(retour){
                case 'tab' : res.send(rows); break;
                case 'tab0' : res.send(rows[4]); break;
                case 'msg' : res.send(res.__(message));
            }
       
    });
};



con.connnecter=function(){
con.connect(function(err) {
    if (err)
        console.log('Erreur de connexion ' + err);
    else
        console.log('Connexion à MySQL');
});
};

con.deconnecter = function () {
    con.end(function (err) {
        if (err) {
            console.log('Erreur de deconnexion MySQL ');
            return;
        }
        console.log('Deconnexion serveur MySQL')
    });
};



module.exports=con;




