
 //show_modal = function(nom_modal) {document.getElementById(nom_modal).style.display = "block";};
    
 //hide_modal = function(nom_modal) {document.getElementById(nom_modal).style.display = "none";};

app.filter('calculatePercentage', function () {
  return function (input) {
      if (input == null || input==0){ return null}
    return Math.floor(input) + " %";
  };
});

app.controller('creation_produits_Ctrl',  function ($scope,$http,$timeout,$q,$translate) {

    $scope.show_modal = function(nom_modal) {document.getElementById(nom_modal).style.display = "block";};
    
    $scope.hide_modal = function(nom_modal) {document.getElementById(nom_modal).style.display = "none";};

    
 
        $scope.newPage = function (mon_url){
        location.href = mon_url;
    };

    $scope.getArray  =  function() {
    let deferred = $q.defer();
        $http.get("/call_routine/RB_creation_loadfile_ngcsv()/tab0").success(function (data){
            deferred.resolve(data);
        });
    return deferred.promise;
};


    $scope.essai = function () {


        alert(obj(localStorage.getItem("Dernier_user")).autorisations.indexOf('traitement_demande')>=0);
    };
    $scope.infoReq = function () {
        $http.post('/infoReq/10',{n : 2}).success(function (text) {
        alert(text)

        }).error(function (response) {alert(response);});
    };







    $scope.OnActivate=function(){

    localStorage.setItem('Dernier_etat', 1);

        $http.get('/current_user').success(function (data) {
            localStorage.setItem('Dernier_user',str(data));

        }).error(function () {
            alert("erreur");
        });

   };
    /** grid_sugg  **/

    $scope.data_sugg = {
        multiSelect: false,
        enableFiltering: true,
        enableRowHeaderSelection: false
    };

    $scope.data_sugg.columnDefs = [
        {name: 'Dep', minWidth: 30, maxWidth: 70, editable: false},
        {name: 'Gr', minWidth: 30, maxWidth: 70, editable: false},
        {name: 'Ref1', minWidth: 30, maxWidth: 150, editable: false},
        {name: 'Ref3', minWidth: 30, maxWidth: 70, editable: false},
        {name: 'Devise', minWidth: 30, maxWidth: 80, editable: false},
        {name: 'Coef', minWidth: 30, maxWidth: 80, editable: false},
        {name: 'nb', minWidth: 30, maxWidth: 80, editable: false},
        {name: 'Desc_gr', minWidth: 30, maxWidth: 300, editable: false},
        {name: 'Four', minWidth: 30, maxWidth:70, editable: false}
    ];




    $scope.data_sugg.onRegisterApi = function (gridApi) {
        $scope.gridApi2 = gridApi;

        gridApi.cellNav.on.navigate($scope, function (newRowCol) {
            $scope.gridApi2.selection.selectRow(newRowCol.row.entity);
            $scope.Dep = newRowCol.row.entity['Dep'];
            $scope.Groupe = newRowCol.row.entity['Gr'];
            $scope.Ref1 = newRowCol.row.entity['Ref1'];
            $scope.Ref3 = newRowCol.row.entity['Ref3'];

            $scope.Copy_price_row(newRowCol.row);

        });
    };


 $scope.Copy_price_row = function (row) {
        var L = $scope.data_sugg.data.indexOf(row.entity);
        var B=$scope.data_sugg.data[L].Coef;

 var A=$scope.My_us_cost; 
 
 if($scope.data_sugg.data[L].Devise=='US') {C=A*1.35}
 else{C=A}

document.getElementById( 'My_cost' ).value=Math.round(C*100)/100;

D=Math.round(C*B*100)/100;
 
document.getElementById( 'My_list' ).value=D;
  
    var toCopy  = document.getElementById( 'My_list' );
        toCopy.select();
  document.execCommand( 'copy' );
   };






    $scope.update_mysql = function () {
        var L = $scope.gridApi.cellNav.getFocusedCell().row.entity.id - 1;


        $scope.gridOptions.data[L].Dep = $scope.Dep;
        $scope.gridOptions.data[L].Groupe = $scope.Groupe;
        $scope.gridOptions.data[L].Ref1 = $scope.Ref1;
        $scope.gridOptions.data[L].Ref3 = $scope.Ref3;
        $scope.gridOptions.data[L].Produit = $scope.Produit;
        $scope.gridOptions.data[L].Desc_fr = $scope.Desc_fr;
        $scope.gridOptions.data[L].Desc_en = $scope.Desc_en;
        $scope.gridOptions.data[L].Four = $scope.Four;
        $scope.gridOptions.data[L].Cost = $scope.Cost;
        $scope.gridOptions.data[L].Qte_core = $scope.Qte_core;
        $scope.gridOptions.data[L].has_env_fee = $scope.has_env_fee;
        $scope.gridOptions.data[L].Prd_cons = $scope.Prd_cons;
        $scope.gridOptions.data[L].Statut = 1;


        $http.post('/update_mysql', $scope.gridOptions.data[L]).then(function (res) {
            

          // show_modal("Progress");
        var url = '/read_table/RB_CREATIONS';
        $http.get(url).success(function (data) {
            $scope.gridOptions.data = data;

          //  $timeout(function () {focuser_a(1);   hide_modal("Progress");});  
        
        }).error(function (response) {
            alert("Req = " + url + "\n\nRes = " + response.status + "  :  " + response.statusText);
        //    hide_modal("Progress");
        });
        }
        ,function (res) {
            alert("Erreur " + res.status + "  :  " + res.statusText);
        });
       
    }


    /** grid_creation_produits  **/

    Cond_Produit = function (grid,row) {
        switch (true) {
            case row.entity.se_trouve_dans_use != '-'  :
                return 'red_style';
            case row.entity.FR12 != null && row.entity.FR12 >= 3 && row.entity.Four != row.entity.Four_0:
                return 'pink_style';
            case row.entity.Statut == 1:
                return 'black_style';
            case row.entity.Statut == 2 && ((row.entity.interchange != null && row.entity.interchange != "")  || (row.entity.alternatives != null && row.entity.alternatives != "")):
                return 'green2_style';
            case row.entity.Statut == 2 && row.entity.Dep != null  && row.entity.Std != '999999' && row.entity.Prix != '999999':
                return 'green_style' ;
                break;
            default:
                return 'grey_style';
        }
    };




            Cond_Prix = function (grid,row) {

            if(row.entity.Std != '999999' && row.entity.Prix != '999999') 
                {return 'green_style' ;} 
            else
                {return 'black_style';}
    };

    Cond_FR12 = function (grid,row) {
        switch (true) {
            case row.entity.FR12 != null && row.entity.FR12 >= 3 && row.entity.Four != row.entity.Four_0:
                return 'red_style';
                 break;
            default:
                return 'black_style';
        }
    };

        Cond_use_de = function (grid,row) {
        switch (true) {
            case row.entity.se_trouve_dans_use != '-'  :
                return 'red_style';
                 break;
            default:
                return 'black_style';
        }
    };

    Cond_Alternatives = function (grid,row) {
        switch (true) {
            case  row.entity.alternatives != null && row.entity.alternatives != "":
                return 'green2_style';
                 break;
            default:
                return 'black_style';
        }
    };

        Cond_Interchange = function (grid,row) {
        switch (true) {
            case  row.entity.interchange != null && row.entity.interchange != "":
                return 'green2_style';
                 break;
            default:
                return 'black_style';
        }
    };


        Cond_Dep = function (grid,row) {
        switch (true) {
            case  row.entity.Dep == null  || row.entity.Dep =='':
                return 'orange_back_style' ;
            case (row.entity.Type == 'Creation pieces' || row.entity.Type == 'Ceation batch pieces' ||  (row.entity.Type == 'Modification pieces' && row.entity.Four != row.entity.Four_0)) && ((row.entity.DEP_INTRANET!=null && row.entity.DEP_INTRANET!=row.entity.Dep) || (row.entity.GR_INTRANET!=null && row.entity.GR_INTRANET!=row.entity.Groupe)):
                return  'red_style';
            case (row.entity.Type == 'Creation pieces' || row.entity.Type == 'Ceation batch pieces' ||  (row.entity.Type == 'Modification pieces' && row.entity.Four != row.entity.Four_0)) && row.entity.Statut==0:
                return 'orange_style';
            break;
            default:
                return 'black_style';
        }
    };


    Cond_Prix_intranet = function (grid,row) {
        switch (true) {
            case (row.entity.Diff_prix_int>=50 || row.entity.Diff_prix_int<=-50):
                return 'red_style';
            case (row.entity.Diff_prix_int!=0):
                return 'orange_style';
            break;
            default:
                return 'black_style';
        }
    };

    Cond_Prix_Std= function (grid,row) {
        switch (true) {
            case (row.entity.Diff_prix>=50 || row.entity.Diff_prix<=-50):
                return 'red_style';
            break;
            default:
                return 'black_style';
        }
    };


        Prix_intranet = function (grid,row) {
           var e = angular.element(document.querySelector('#COST_INTRANET'));
  
        switch (true) {
            case COST_INTRANET!=null && COST_INTRANET!=Cost:
                e.style
            case COST_INTRANET!=null:
            return 'orange_style';
            break;
            default:
                return 'black_style';
        }
    };

  

    $scope.gridOptions = {
   
        showGridFooter: true,
        //enableFiltering: true,
        enableRowHeaderSelection: false,
        multiSelect: false
    };






    $scope.gridOptions.columnDefs = [

        {name: 'id', minWidth: 20, maxWidth: 30, editable: false},
        {
            name: 'Holder',
            maxWidth: 50,
            cellTemplate: '<button class="my_btn" ng-click="grid.appScope.HoldRow(row)"> Hold</button>'
        },
        {name: 'Commis', minWidth: 20, maxWidth: 200, editable: false},
        {name: 'Type', minWidth: 20, maxWidth: 150, editable: false},
        {field: 'Produit', minWidth: 20, maxWidth: 150,headerCellFilter: 'translate'},
        {name: 'Make', minWidth: 20, maxWidth: 150, displayName: "Marque"},
        {name: 'Four', minWidth: 20, maxWidth: 80, displayName: "Fourn", headerCellFilter: 'translate'},
        {name: 'Desc_four', minWidth: 20, maxWidth: 300, displayName: "Nom fourn"},
        {name: 'Four_0', minWidth: 20, maxWidth: 80, displayName: "Fourn old"},
     /*  {name: 'Desc_fr', minWidth: 20, maxWidth: 150, displayName: "Desc FR"},*/
        {name: 'Desc_en', minWidth: 20, maxWidth: 150, displayName: "Desc EN"},
        {name: 'Dep', minWidth: 20, maxWidth: 80, displayName: "Departement", cellClass: Cond_Dep},
        {name: 'Groupe', minWidth: 20, maxWidth: 80, cellClass: Cond_Dep},
        {name: 'Devise', minWidth: 20, maxWidth: 80, headerCellFilter: 'translate'},
        {name: 'Std', minWidth: 20, maxWidth: 100, displayName: "Cout std", cellClass: Cond_Prix, cellFilter: 'currency'},
        {name: 'Prix', minWidth: 20, maxWidth: 100, cellClass: Cond_Prix, cellFilter: 'currency', headerCellFilter: 'translate'},
        {name: 'Ref1', minWidth: 20, maxWidth: 80, cellClass: Cond_Dep},
        {name: 'Ref3', minWidth: 20, maxWidth: 80, cellClass: Cond_Dep},
        {name: 'Diff_prix', minWidth: 20, maxWidth: 80, cellClass: Cond_Prix_Std, displayName: "Cost %", cellFilter: 'calculatePercentage', sortCellFiltered: true},
        {name: 'Diff_prix_int', minWidth: 20, maxWidth: 80, cellClass: Cond_Prix_intranet, displayName: "Intra %", cellFilter: 'calculatePercentage'},        
        {name: 'Prd_cons', minWidth: 20, maxWidth: 80, displayName: "Env fee"},
        {name: 'se_trouve_dans_use', minWidth: 20, maxWidth: 80, displayName: "Use de", cellClass: Cond_use_de},
        {name: 'FR12', minWidth: 20, maxWidth: 80, displayName: "nb trans", cellClass: Cond_FR12},
        {name: 'interchange', minWidth: 20, maxWidth: 80, displayName: "Interchange", cellClass: Cond_Interchange},
        {name: 'alternatives', minWidth: 20, maxWidth: 80, displayName: "Alternatives", cellClass: Cond_Alternatives},
        {name: 'valide', minWidth: 20, maxWidth: 80, displayName: "valide"},
        {name: 'Statut', minWidth: 20, maxWidth: 80, displayName: "Statut"}

    ];


    // $scope.hide_nav=false;


    $scope.gridOptions.onRegisterApi = function (gridApi) {
        $scope.gridApi = gridApi;

        gridApi.cellNav.on.navigate($scope, function (newRowCol) {
            $scope.affiche(newRowCol.row.entity);
        });
    };


    $scope.HoldRow = function (row) {
        var L = $scope.gridOptions.data.indexOf(row.entity);

        //var L=$scope.gridApi.cellNav.getFocusedCell().row.entity.id-1;
        $scope.gridOptions.data[L].valide = 0; //si($scope.gridOptions.data[L].valide==1,0,1);

        $http.post('/update_mysql2', $scope.gridOptions.data[L]).success(function () {

            alert('fait');


        }).error(function (response) {
            alert("Erreur " + response.status + "  :  " + response.statusText);
        });
    };








    function focuser_a(n) {
        $scope.gridApi.selection.selectRow($scope.gridOptions.data[n - 1]);
        $scope.gridApi.cellNav.scrollToFocus($scope.gridOptions.data[n - 1], $scope.gridOptions.columnDefs[0]);
    }


    /**  Autres commande de creation_produit ***/




    $scope.read_mysql = function () {
        show_modal("Progress");
        var url = '/read_table/RB_CREATIONS';
        $http.get(url).success(function (data) {
            $scope.gridOptions.data = data;

            $timeout(function () {
                focuser_a(1);
                hide_modal("Progress");
            });
        }).error(function (response) {
            alert("Req = " + url + "\n\nRes = " + response.status + "  :  " + response.statusText);
            hide_modal("Progress");
        });

    };


    $scope.update_uigrid_mysql = function () {
        show_modal("Progress");

        $http.get('/call_routine/RB_MJ_CREATIONS()/tab0').success(function (data) {
            $scope.gridOptions.data = data;

            $timeout(function () {
                focuser_a(1);
                hide_modal("Progress");
            });
        }).error(function (response) {
            alert("Req = " + url + "\n\nRes = " + response.status + "  :  " + response.statusText);
            hide_modal("Progress");
        });

    };

    $scope.initialiser_table = function () {

        var url = '/vider_creations';
        $http.get(url).success(function () {
            $scope.update_uigrid_mysql();

        }).error(function (response) {
            alert("Req = " + url + "\n\nRes = " + response.status + "  :  " + response.statusText);

        });
    };


    $scope.calcul_mysql= function () {
        show_modal("Progress");
        $http.get('/call_routine/RB_MJ_CREATIONS_CALCUL()/tab0').success(function (data) {
            $scope.gridOptions.data = data;
            $timeout(function () {focuser_a(1);hide_modal("Progress")});

        }).error(function () {alert("Erreur");hide_modal("Progress")});
    };
    



    $scope.creation_loadfile= function () {
        show_modal("Progress");

    $http.get('/call_routine/RB_MJ_CREATIONS_CALCUL()/tab0').success(function (data) {
            $scope.gridOptions.data = data;

            $http.get('/call_routine/RB_creation_loadfile()/msg').then(function (response) {
            $timeout(function () {hide_modal("Progress");alert(response.data)});
        }).error(function () {alert("Erreur");hide_modal("Progress")});


            $timeout(function () {focuser_a(1);hide_modal("Progress")});

        }).error(function () {alert("Erreur");hide_modal("Progress")});


     

    };





    $scope.affiche = function(ligne) {

        $scope.gridApi.selection.selectRow(ligne);
        var nb_ligne= $scope.gridApi.core.getVisibleRows().length;

        $scope.id = ligne.id+' / '+nb_ligne;
        $scope.Commis = ligne.Commis;
        $scope.Type = ligne.Type;
        $scope.Produit = ligne.Produit;
        $scope.Desc_fr = ligne.Desc_fr;
        $scope.Desc_en = ligne.Desc_en;
        $scope.Suggestion = ligne.Suggestion;
        $scope.Dep = ligne.Dep;
        $scope.Groupe = ligne.Groupe;
        $scope.Four = ligne.Four;
        $scope.Make = ligne.Make;
        $scope.Std = ligne.Std;
        $scope.Prix = ligne.Prix;
        $scope.Ref1 = ligne.Ref1;
        $scope.Ref3 = ligne.Ref3;
        $scope.Nature = ligne.Nature;
        $scope.Qte_core = ligne.Qte_core;
        $scope.has_env_fee= ligne.has_env_fee;
        $scope.env_fee= ligne.env_fee;
        $scope.Prd_cons= ligne.Prd_cons;
        $scope.Ded_inv = ligne.Ded_inv;
        $scope.DEP_INTRANET = ligne.DEP_INTRANET;
        $scope.GR_INTRANET = ligne.GR_INTRANET;
        $scope.COST_INTRANET = ligne.COST_INTRANET;
        $scope.interchange = ligne.interchange;
        $scope.alternatives = ligne.alternatives;
        $scope.Cost = ligne.Cost;
        $scope.Devise = ligne.Devise;
        $scope.Dep_0 = ligne.Dep_0;
        $scope.Groupe_0 = ligne.Groupe_0;
        $scope.Std_0 = ligne.Std_0;
        $scope.Prix_0 = ligne.Prix_0;
        $scope.Ref1_0 = ligne.Ref1_0;
        $scope.Ref3_0 = ligne.Ref3_0;
        $scope.se_trouve_dans_use = ligne.se_trouve_dans_use;

        $scope.My_us_cost=10;

        if(ligne.Suggestion==null)
        {$scope.data_sugg.data=[]}
        else
        {$scope.data_sugg.data=JSON.parse(ligne.Suggestion)}



    };


    $scope.toutes_les_proposition = function(ligne) {


        show_modal("Progress");
        var url = "/DB/SELECT Pro_Resume FROM RB_Combinaisons_creation_produits WHERE PRO_FOUR='Toutes'/tab0";
        $http.get(url).success(function (data) {
            $scope.data_sugg.data = JSON.parse(data.Pro_Resume);

            $timeout(function () {
                //    focuser_a(1);
                hide_modal("Progress");
            });
        }).error(function (response) {
            alert("Req = " + url + "\n\nRes = " + response.status + "  :  " + response.statusText);
            hide_modal("Progress");
        });
    }

    $scope.precedent= function () {
        var L=$scope.gridApi.cellNav.getFocusedCell().row.entity.id;
        if (L> 0)
        { focuser_a(L-1)}

    };


    $scope.suivant = function () {
        var nb_ligne= $scope.gridApi.core.getVisibleRows().length;
        var L=$scope.gridApi.cellNav.getFocusedCell().row.entity.id;
        if (L< nb_ligne)
        {focuser_a(L+1)}

    };





});

/*
// utilisé pour traduire les ui-grid
app.config(function ($translateProvider) {
    $translateProvider.translations('fr', {
        Produit: 'Produit',
        Fourn: 'Fourn',
        Prix: 'Prix de liste',
        Parametres : 'Parametres'
    });
    $translateProvider.translations('en', {
        Produit: 'Product',
        Fourn: 'Supplier',
        Prix: 'Retail',
        Parametres : 'Setting'
    });
    $translateProvider.preferredLanguage('en');
});

*/












