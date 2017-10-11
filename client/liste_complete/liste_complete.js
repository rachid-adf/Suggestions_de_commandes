show_modal = function(nom_modal) {document.getElementById(nom_modal).style.display = "block";};
    
hide_modal = function(nom_modal) {document.getElementById(nom_modal).style.display = "none";};





app.controller('Liste_complete_Ctrl', function ($scope, $http, $timeout) {

    function focuser_a(n) {
        $scope.gridApi3.selection.selectRow($scope.data_dep.data[n - 1]);
        $scope.gridApi3.cellNav.scrollToFocus($scope.data_dep.data[n - 1], $scope.data_dep.columnDefs[0]);
    }

    myFormat=function(x){
        var DecimalSeparator = Number("1.2").toLocaleString().substr(1,1);
        
        var AmountWithCommas = x.toLocaleString();
        var arParts = String(AmountWithCommas).split(DecimalSeparator);
        var intPart = arParts[0];
        var decPart = (arParts.length > 1 ? arParts[1] : '');
        decPart = (decPart + '00').substr(0,2);
        
        return '$ ' + intPart + DecimalSeparator + decPart;
    }

    $scope.data_dep = {
        multiSelect: false,
        enableRowHeaderSelection: false
    };

    $scope.data_dep.columnDefs = [
        {name: 'symbol', minWidth: 30, maxWidth: 150, editable: false},
        {name: 'name', minWidth: 30, maxWidth: 150, editable: false},
        {name: 'rank', minWidth: 30, maxWidth: 150, editable: false},
        {name: 'price_usd', minWidth: 30, maxWidth: 150, editable: false},
        {name: 'price_btc', minWidth: 30, maxWidth: 150, editable: false},
        {name: '24h_volume_usd', minWidth: 30, maxWidth: 150, editable: false},
        {name: 'market_cap_usd', minWidth: 30, maxWidth: 150, editable: false},
        {name: 'percent_change_24h', minWidth: 30, maxWidth: 150, editable: false},
        {name: 'percent_change_7d', minWidth: 30, maxWidth: 150, editable: false},

        {
            name: 'Delete',
            cellTemplate: '<button class="my_btn" ng-click="grid.appScope.deleteRow(row)"> Sup</button>'
        }

    ];


    $scope.data_dep.onRegisterApi = function (gridApi) {
        $scope.gridApi3 = gridApi;

        gridApi.cellNav.on.navigate($scope, function (newRowCol) {
            $scope.gridApi3.selection.selectRow(newRowCol.row.entity);

        });
    };





    $scope.read_mysql_dep = function () {
   
        //document.getElementById("Progress").style.display = "block";
       show_modal("Progress");
        var url = "https://api.coinmarketcap.com/v1/ticker/?limit=25";
        $http.get(url).success(function (data) {
        //alert(JSON.stringify(data))
        //alert(data[0].name)
         
           $scope.data_dep.data = data;

            $timeout(function () {
                   focuser_a(1);
                  hide_modal("Progress");
            });
        }).error(function (response) {
            alert("Req = " + url + "\n\nRes = " + response.status + "  :  " + response.statusText);
            hide_modal("Progress");
        });

    };

    $scope.refresh_graph = function () {

        $http.get('https://min-api.cryptocompare.com/data/histominute?fsym=BTC&tsym=USD&limit=60&aggregate=3&e=CCCAGG').success(function (data) {
           
            $scope.options.data = data.Data
     
        
                    }).error(function (response) {
                        alert("Req = " + url + "\n\nRes = " + response.status + "  :  " + response.statusText);
                    });
                };
            
              

              
                    
                

                
                

    $scope.options = {

        dimensions: {    
       
          open: {
                type: 'line',
                axis: 'y',
                //dataType : 'numeric',
                displayFormat : function(x){
                    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                }

              },


        volumeto: {
            type: 'bar',
            axis: 'y2',
            color : 'gray' ,
            //prefix: "$",
        
            displayFormat : function(x){
                var DecimalSeparator = Number("1.2").toLocaleString().substr(1,1);
                
                var AmountWithCommas = x.toLocaleString();
                var arParts = String(AmountWithCommas).split(DecimalSeparator);
                var intPart = arParts[0];
                var decPart = (arParts.length > 1 ? arParts[1] : '');
                decPart = (decPart + '00').substr(0,2);
                
                return '$ ' + intPart + DecimalSeparator + decPart;
            }
        },
         time: {
           axis: 'x',
           dataType : 'datetime',

           displayFormat: function (x) { var a = new Date(x * 1000);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var hour = a.getHours();
            var min =  (a.getMinutes()<10?'0':'') + a.getMinutes()
            var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
            return time },
    
           name: 'Date',

          },
        

        }

    

      };



     

      // optional (direct access to c3js API http://c3js.org/reference.html#api) 
   $scope.instance = null;


});
