show_modal = function(nom_modal) {document.getElementById(nom_modal).style.display = "block";};

hide_modal = function(nom_modal) {document.getElementById(nom_modal).style.display = "none";};




str =function (obj) {return JSON.stringify(obj)};

obj =function (obj) {return JSON.parse(obj)};

store =function (nom,obj) {sessionStorage.setItem(nom, JSON.stringify(obj))};

read =function (nom) {return  JSON.parse(sessionStorage.getItem(nom))};

test =function (obj) {alert(JSON.stringify(obj))};


function setCookie(cname,cvalue,exdays) {
    var d = new Date();

    d.setTime(d.getTime() + (exdays*24*60*60*1000));


    var expires = "expires=" + d.toGMTString();

    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}



function checkCookie() {
    var user=getCookie("username");
    if (user != "") {
        alert( "Welcome again " + user);
    } else {
        user = prompt("Please enter your name:","");
        if (user != "" && user != null) {
            setCookie("username", user, 30);
        }
    }
}

function Copier() {
/*
var toCopy  = document.getElementById( 'My_list' );
  
  toCopy.select();

 document.execCommand( 'copy' );
    alert('Fait');  
*/
}





var app = angular.module('App', [

    'ui.grid',
    'pascalprecht.translate',
    'ui.grid.edit',
    'ui.grid.cellNav',
    'ui.grid.selection',
    //'ui.grid.pinning,'
    'ui.grid.resizeColumns',
    'ui.grid.moveColumns',
    'ngSanitize', 'ngCsv',
    'angularChart',

    //,'ngRoute'
    //,'i18n'

]).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('#').endSymbol('#');
    //    $interpolateProvider.startSymbol('*').endSymbol('*');
});;





app.controller('Main_Ctrl',  function ($scope,$translate) {




        $scope.newPage = function (mon_url){
        location.href = mon_url;
    };



            $scope.Menu_list =  [
            {'Link' : '/users/creation_produits','Titre' : 'Création de produits'},
            {'Link' : '/users/parametres','Titre' : 'Parametres'},
            {'Link' : '/users/liste_complete','Titre' : 'Liste complete'},
            {'Link' : '/users/demandes_de_suppression','Titre' : 'Demandes de supression'},
            {'Link' : '/send_mail','Titre' : 'Envoyer Email'},
            {'Link' : '/csv','Titre' : 'Creer fichier csv'},
            {'Link' : '/test-msexcel-builder','Titre' : 'Creer fichier Excel 1'},
            {'Link' : '/xlsx','Titre' : 'Creer fichier Excel 2'}];

    
        $scope.essai = function (){
            alert('fait')
      alert(i18n.__( "My translation phrase" ))
        }
});





// utilisé pour traduire les ui-grid
app.config(function ($translateProvider) {

    $translateProvider.translations('fr', {
        Produit: 'Produit',
        Fourn: 'Fourn',
        Prix: 'Prix de liste'
    });


    $translateProvider.translations('en', {
        Produit: 'Product',
        Fourn: 'Supplier',
        Prix: 'Retail',
        Parametres : 'Setting'
    });
    $translateProvider.preferredLanguage('en');
});


