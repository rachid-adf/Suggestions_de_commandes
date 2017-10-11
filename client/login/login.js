app.controller('Login_Ctrl',  function ($scope, $http,$timeout) {



    $scope.login_click = function() {

         let post= {
             user : document.forms['login_form'].username.value,
             pw   : document.forms['login_form'].password.value
         };
        if($scope.autosavePW==true) {
         localStorage.setItem('user_provisoir', JSON.stringify(post));}
      // a revoir, pas tres securitaire
    };




    $scope.login_auto = function() {
        if (localStorage.getItem('Dernier_etat')==1) {


        let obj = JSON.parse(localStorage.getItem('user_provisoir'));

       if(obj.user !=null)  {
           document.forms['login_form'].username.value=obj.user;
           document.forms['login_form'].password.value=obj.pw;
           document.forms['login_form'].submit();

       }
            //setCookie('Dernier_etat',"0",5);
            localStorage.setItem('Dernier_etat', 0);

        }


/*       //ne fonctionne pas comme je veux
        $timeout(function () {
            if(document.forms['login_form'].username.value != "" && document.forms['login_form'].password.value != "")
            {document.forms['login_form'].submit();}
            alert($cookies.get("user"))
        }, 500);*/
    };

    $scope.frontend_logout= function() {
        localStorage.removeItem('user_provisoir');
    }

});