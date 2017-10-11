app.controller('Demandes_de_suppression_Ctrl',  function ($scope, $http) {



    $scope.data_T2 = {
        multiSelect: false,
        enableRowHeaderSelection: false
    };

    $scope.has_display_permission=function(autorisation){
      return obj(localStorage.getItem('Dernier_user')).autorisations.indexOf(autorisation)>=0
        };



    $scope.data_T2.columnDefs = [
        {name: 'id', minWidth: 20, maxWidth: 30, displayName: "id",headerCellFilter: 'translate', editable: false},
        {name: 'demandeur', minWidth: 30, maxWidth: 120, displayName: "Demandeur", editable: false},
        {name: 'produits_a_gar', minWidth: 30, maxWidth: 400, displayName: "A garder", editable: false},
        {name: 'date_ajout', minWidth: 20, maxWidth: 120, displayName: "Date d'ajout",cellFilter: 'date:"yyyy-MM-dd"', editable: false},
        {name: 'date_modif', minWidth: 20, maxWidth: 120, displayName: "Date de traitement",cellFilter: 'date:"yyyy-MM-dd"', editable: false},
        {
            name: 'supprimer_demande', displayName: '', maxWidth: 50,
            cellTemplate: '<button class="my_btn" ng-click="grid.appScope.supprimer_demande(row)"><span class=" glyphicon glyphicon-remove"></span></button>'
        },
        {
            name: 'detail_demande', displayName: '', maxWidth: 50,
            cellTemplate: '<button class="my_btn" ng-click="grid.appScope.detail_demande(row)"><span class=" glyphicon glyphicon-list-alt"></span></button>'
        },
        {
            name: 'traiter_demande', displayName: '', maxWidth: 50,
            cellTemplate: '<button class="my_btn"  ng-show="grid.appScope.has_display_permission(\'traitement_demande\')"  ng-click="grid.appScope.traitement_demande(row)"><span class=" glyphicon glyphicon-random"></span></button>'
        }


    ];


    $scope.data_T2.onRegisterApi = function (gridApi) {
        $scope.gridApi_T2 = gridApi;
//selectionner tout la ligne quand j'appue sur une cellule
        gridApi.cellNav.on.navigate($scope, function (newRowCol) {
            $scope.gridApi_T2.selection.selectRow(newRowCol.row.entity);
            //$scope.affiche_T2(newRowCol.row.entity);

        });
    };




    $scope.charger_grid_T2 = function() {

        $http.get("/call_routine/RB_app_demandes_de_suppression()/tab").success(function (data) {

            if (data == null) {
                $scope.data_T2.data = []
            }
            else {
                $scope.data_T2.data=data[0];
            }

        }).error(function () {
            alert("Erreur");
        });
    };


        $scope.detail_demande = function(row) {
            store('ligne',row.entity);
            location.href = "/users/detail_demande";

        };

    $scope.traitement_demande = function(row) {
        store('ligne',row.entity);
        location.href = "/users/traitement_demande";

    };





    $scope.new_demande = function() {
        store('ligne',0);
        location.href = "/users/detail_demande";


    };



    $scope.cancel = function() {
        location.href = "/users/demandes_de_suppression";
    };



        $scope.affiche_detail_demande = function() {

            let ligne = read("ligne");
            if (ligne==0) {
                $scope.T2_id = "New";
              //$scope.T2_date_ajout = new Date().toLocaleFormat('%Y-%m-%d');
                $scope.T2_demandeur =obj(localStorage.getItem("Dernier_user")).name;

                $scope.T2_date_modif = "";}

                else {

            show_modal("Progress");
         
        //$scope.gridApi_T2.selection.selectRow(ligne);
       // let nb_ligne= $scope.gridApi_T2.core.getVisibleRows().length;
            
        $scope.T2_id = ligne.id;
        $scope.T2_demandeur = ligne.demandeur;
        $scope.T2_date_ajout = ligne.date_ajout;
        $scope.T2_date_modif = ligne.date_ajout;


        $http.get("/call_routine/RB_app_detail_demande("+ligne.id+")/tab").success(function (data) {
          //  location.href = "/users/detail_demande";
            if (data[0] == null) {$scope.data_T3.data = []} else{$scope.data_T3.data=data[0];}
            if (data[1] == null) {$scope.data_T4.data = []} else{$scope.data_T4.data=data[1];}
            hide_modal("Progress");

        }).error(function () {
            alert("Erreur");
        });
            }

    };






    function focuser_T2_a(n) {
        $scope.gridApi_T2.selection.selectRow($scope.data_T2.data[n - 1]);
        $scope.gridApi_T2.cellNav.scrollToFocus($scope.data_T2.data[n - 1], $scope.data_T3.columnDefs[0]);
    }










    $scope.data_T3 = {multiSelect: false, enableRowHeaderSelection: false};

    $scope.data_T3.data = [{produit : '7003PP'},{produit : 'EX63804AE'},{produit : 'AP63804AEJ'}];

    $scope.data_T3.columnDefs = [
        {
            name: 'supprimer', displayName: '', maxWidth: 50,
            cellTemplate: '<button class="my_btn" ng-click="grid.appScope.vers_obsolete(row)"><span class="glyphicon glyphicon-arrow-down"></span></button>'
        },
        {
            name: 'modifier', displayName: '', maxWidth: 50,
            cellTemplate: '<button class="my_btn" ng-click="grid.appScope.affiche_diag(row)"><span class="glyphicon glyphicon-pencil"></span></button>'
        },
        {name: 'produit', minWidth: 30, maxWidth: 120, displayName: "Produit", editable: false},
        {name: 'lcm_desc', minWidth: 30, maxWidth: 200, displayName: "Description", editable: false},
        {name: 'new_desc', minWidth: 20, maxWidth: 200, displayName: "Nouvelle desc", editable: false},
        {name: 'redy', minWidth: 40, maxWidth: 40, displayName: "Ok", editable: false},
        {name: 'OH_01', minWidth: 20, maxWidth: 30, displayName: "01", editable: false},
        {name: 'OH_02', minWidth: 20, maxWidth: 30, displayName: "02", editable: false},
        {name: 'OH_03', minWidth: 20, maxWidth: 30, displayName: "03", editable: false},
        {name: 'OH_04', minWidth: 20, maxWidth: 30, displayName: "04", editable: false},
        {name: 'OH_05', minWidth: 20, maxWidth: 30, displayName: "05", editable: false},
        {name: 'OH_06', minWidth: 20, maxWidth: 30, displayName: "06", editable: false},
        {name: 'OH_07', minWidth: 20, maxWidth: 30, displayName: "07", editable: false},
        {name: 'OH_11', minWidth: 20, maxWidth: 30, displayName: "11", editable: false},
        {
            name: 'supprimer_produit', displayName: '', maxWidth: 50,
            cellTemplate: '<button class="my_btn" ng-click="grid.appScope.supprimer(row)"><span class=" glyphicon glyphicon-remove"></span></button>'
        },
    ];


    $scope.data_T4 = {
        showGridFooter: true,
        enableFiltering: true,
        enableRowHeaderSelection: false,
        multiSelect: false
    };



    $scope.data_T4.columnDefs = [
        {
        name: 'garder', displayName: '',maxWidth: 50,
        cellTemplate: '<button class="my_btn" ng-click="grid.appScope.vers_garder(row)"><span class="glyphicon glyphicon-arrow-up"></span></button>'
        },
        {name: 'produit', minWidth: 30, maxWidth: 120, displayName: "Produit", editable: false},
        {name: 'lcm_desc', minWidth: 30, maxWidth: 150, displayName: "Description", editable: false},
        {name: 'redy', minWidth: 50, maxWidth: 50, displayName: "Ok", editable: false},
        {name: 'OH_01', minWidth: 20, maxWidth: 30, displayName: "01", editable: false},
        {name: 'OH_02', minWidth: 20, maxWidth: 30, displayName: "02", editable: false},
        {name: 'OH_03', minWidth: 20, maxWidth: 30, displayName: "03", editable: false},
        {name: 'OH_04', minWidth: 20, maxWidth: 30, displayName: "04", editable: false},
        {name: 'OH_05', minWidth: 20, maxWidth: 30, displayName: "05", editable: false},
        {name: 'OH_06', minWidth: 20, maxWidth: 30, displayName: "06", editable: false},
        {name: 'OH_07', minWidth: 20, maxWidth: 30, displayName: "07", editable: false},
        {name: 'OH_11', minWidth: 20, maxWidth: 30, displayName: "11", editable: false},
        {name: 'origine', minWidth: 20, maxWidth: 1000, displayName: "lien", editable: false,resizable: true},
        {
            name: 'Remplacable', displayName: 'Remplacable ?',maxWidth: 150,
            cellTemplate: '<input type="checkbox" ng-show="row.entity.redy ==\'non\'" >'
        }

    ];


    $scope.data_T5 = {multiSelect: false, enableRowHeaderSelection: false};

    $scope.data_T5.data = [];

    $scope.data_T5.columnDefs = [

        {name: 'produit', minWidth: 30, maxWidth: 120, displayName: "Produit", editable: false},
        {name: 'lcm_desc', minWidth: 30, maxWidth: 200, displayName: "Description", editable: false},
        {name: 'new_desc', minWidth: 20, maxWidth: 200, displayName: "Nouvelle desc", editable: false},
        {name: 'redy', minWidth: 40, maxWidth: 40, displayName: "Ok", editable: false},
        {name: 'OH_01', minWidth: 20, maxWidth: 30, displayName: "01", editable: false},
        {name: 'OH_02', minWidth: 20, maxWidth: 30, displayName: "02", editable: false},
        {name: 'OH_03', minWidth: 20, maxWidth: 30, displayName: "03", editable: false},
        {name: 'OH_04', minWidth: 20, maxWidth: 30, displayName: "04", editable: false},
        {name: 'OH_05', minWidth: 20, maxWidth: 30, displayName: "05", editable: false},
        {name: 'OH_06', minWidth: 20, maxWidth: 30, displayName: "06", editable: false},
        {name: 'OH_07', minWidth: 20, maxWidth: 30, displayName: "07", editable: false},
        {name: 'OH_11', minWidth: 20, maxWidth: 30, displayName: "11", editable: false},
        {
            name: 'supprimer_use', displayName: '', maxWidth: 50,
            cellTemplate: '<button class="my_btn" ng-click="grid.appScope.supprimer_use(row)"><span class=" glyphicon glyphicon-remove"></span></button>'
        },
    ];


    $scope.add_produit = function() {

        let b=false;
        angular.forEach($scope.data_T3.data, function (x) {
            if ($scope.add_input == x.produit) {b = true; return;}
        });

        angular.forEach($scope.data_T4.data, function (x) {
            if ($scope.add_input == x.produit) {b = true; return;}
        });

        angular.forEach($scope.data_T5.data, function (x) {
            if ($scope.add_input == x.produit) {b = true; return;}
        });

        if (b==true)
        {alert("Element existe deja dans la liste");}
        else {

            $http.get("/DB/Select PRD,DES,OH_01,OH_02,OH_03,OH_04,OH_05,OH_06,OH_07,OH_11 from RB_STOCK where PRD='"+$scope.add_input+"'/tab0").success(function (data) {

                if(data.PRD==null)
                {alert('Le numero n esxiste pas sur LCM');}
                else {
                    $scope.data_T3.data.push({
                        produit : $scope.add_input,
                        lcm_desc : data.DES,
                        redy : data.OH,
                        OH_01 : data.OH_01,
                        OH_02 : data.OH_02,
                        OH_03 : data.OH_03,
                        OH_04 : data.OH_04,
                        OH_05 : data.OH_05,
                        OH_06 : data.OH_06,
                        OH_07 : data.OH_07,
                        OH_11 : data.OH_11

                    });
                    $scope.add_input="";
                }


            }).error(function () {alert("Erreur")});


        }

    };


    $scope.add_use = function() {

        let b=false;
        angular.forEach($scope.data_T3.data, function (x) {
            if ($scope.add_input_use == x.produit) {b = true; return;}
        });

        angular.forEach($scope.data_T4.data, function (x) {
            if ($scope.add_input_use == x.produit) {b = true; return;}
        });

        angular.forEach($scope.data_T5.data, function (x) {
            if ($scope.add_input_use == x.produit) {b = true; return;}
        });

        if (b==true)
        {alert("Element existe deja dans les listes");}
        else {

            $http.get("/DB/Select PRD,DES,OH_01,OH_02,OH_03,OH_04,OH_05,OH_06,OH_07,OH_11 from RB_STOCK where PRD='"+$scope.add_input_use+"'/tab0").success(function (data) {

                if(data.PRD==null)
                {   $scope.data_T5.data.push({
                    produit : $scope.add_input_use});
                    $scope.add_input_use="";
                }
                else {
                    $scope.data_T5.data.push({
                        produit : $scope.add_input_use,
                        lcm_desc : data.DES,
                        redy : data.OH,
                        OH_01 : data.OH_01,
                        OH_02 : data.OH_02,
                        OH_03 : data.OH_03,
                        OH_04 : data.OH_04,
                        OH_05 : data.OH_05,
                        OH_06 : data.OH_06,
                        OH_07 : data.OH_07,
                        OH_11 : data.OH_11

                    });
                    $scope.add_input_use="";
                }


            }).error(function () {alert("Erreur")});


        }

    };




    $scope.vers_garder = function(row) {
        let index = $scope.data_T4.data.indexOf(row.entity);
        $scope.data_T3.data.push(row.entity);
        $scope.data_T4.data.splice(index, 1);

    };


    $scope.vers_obsolete = function(row) {
        let index = $scope.data_T3.data.indexOf(row.entity);
        $scope.data_T4.data.push(row.entity);
        $scope.data_T3.data.splice(index, 1);

    };


    $scope.supprimer = function(row) {
        let index = $scope.data_T3.data.indexOf(row.entity);
        $scope.data_T3.data.splice(index, 1);

    };


    $scope.supprimer_use = function(row) {
        let index = $scope.data_T5.data.indexOf(row.entity);
        $scope.data_T5.data.splice(index, 1);

    };



    $scope.affiche_diag = function(row) {
        store('var1', $scope.data_T3.data.indexOf(row.entity));
        $scope.modal_lcm_desc=row.entity.lcm_desc;
        $scope.modal_new_desc=row.entity.new_desc;

        show_modal('Modif_desc');

    };


    $scope.ferme_diag = function() {
        
        $scope.data_T3.data[read('var1')].new_desc=$scope.modal_new_desc;

        hide_modal('Modif_desc');
    };


    $scope.chercher_numeros_liees = function() {

        var ch = "'";
        for(key in $scope.data_T3.data){
            var str = $scope.data_T3.data[key].produit;
            ch = ch + str+ ",";
        }

        if (ch.substr(ch.length - 1, 1) == ",") {
            ch = ch.substr(0, ch.length - 1);
        }
        ch = ch + "'";


        var ch_use = "'";
        for(key in $scope.data_T5.data){
            var str = $scope.data_T5.data[key].produit;
            ch_use = ch_use + str+ ",";
        }

        if (ch_use.substr(ch_use.length - 1, 1) == ",") {
            ch_use = ch_use.substr(0, ch_use.length - 1);
        }
        ch_use = ch_use + "'";

      //  ch=JSON.stringify($scope.data_T3.data);
     //   ch_use=JSON.stringify($scope.data_T5.data);

       // var Indata = {param:'val1',.....}
        show_modal("Progress");

        var url = "/call_routine/RB_app_numeros_obsolete/tab";

        //var url = '/call_routine/RB_verif_numeros_a_detruire()/tab0';
        $http.post(url,[ch,ch_use]).success(function (data) {

            if (data == null) {
                $scope.data_T4.data = []
            }
            else {
                $scope.data_T4.data = data[4]
            }
            hide_modal("Progress");

        }).error(function (response) {
            hide_modal("Progress");
            alert("Req = " + url + "\n\nRes = " + response.status + "  :  " + response.statusText);

        });
    };
});
