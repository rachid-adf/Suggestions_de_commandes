app.controller('Parametres_Ctrl',  function ($scope, $http) {



    $scope.view_activite = function () {
      

        $http.get('/read_table/RB_Parametres_creation').then(function (res) {
            $scope.nb_jours = res.data[0].Nb_jours_a_charger;
            $scope.taux_de_change = res.data[0].Taux_de_change;
            $scope.date_modif = res.data[0].Date_modif;
            $scope.user_modif = res.data[0].User_modif;
             //alert(res.status+' - '+res.statusText+' - '+res.data)//Affichage de develepement 
        },function (res) { alert(res.status+' - '+res.statusText)});
    };



        $scope.send_info = function () {
    
      
        var parameter = JSON.stringify({Nb_jours_a_charger: $scope.nb_jours , Taux_de_change: $scope.taux_de_change});

        $http.post('/send_info',parameter).then(function (res) {
        $scope.view_activite();    
        //alert(res.status+' - '+res.statusText+' - '+res.data) //Affichage de develepement   
        alert('Done !')
     }
        ,function (res) {alert(res.status+' - '+res.statusText);}
    );


};

});