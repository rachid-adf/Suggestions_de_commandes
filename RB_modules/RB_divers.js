
//var app=require('../app');
var repertoir=process.cwd();

exports.trad=function(str){return res.__(str)};






Left = function (str, n) {
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else
        return String(str).substring(0, n);
};
exports.Right = function (str, n) {
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else {
        var iLen = String(str).length;
        return String(str).substring(iLen, iLen - n);
    }
};



si = function (cond, rep1, rep2) {
        if (cond) {
            return rep1
        }
        else {
            return rep2
        }
    };






exports.CurFunc= function () {
    var myName = arguments.callee.toString();
    myName = myName.substr('function '.length);
    myName = myName.substr(0, myName.indexOf('('));

    console.log(myName);
};


exports.code_couleur = function () {
    var i;
    for (i = 29; i <= 38; i++) {
        process.stdout.write('\x1b[' + i + 'm' + ' ' + i);
    }
    for (i = 91; i <= 96; i++) {
        process.stdout.write('\x1b[' + i + 'm' + ' ' + i);
    }
    console.log('');
};







nom_fichier_sans_repartoir = function (str) {

str= str.replace(repertoir+"\\", "");

    return str;
};

nom_fichier_formater = function (str) {
    str = str.substring(str.lastIndexOf("\\") + 1, str.length - 3);
    str = str.replace("RB_", "");
    str = Left(str + '                 ', 10);

    return str;
};




exports.log_server = function (server) {
  process.stdout.write('\x1b[29m'+'Listening at : '); console.log('http://%s:%s', si(server.address().address=='::','localhost',server.address().address), server.address().port);
};





exports.foo=function(req, res){
    return req.method+' '+ req.url + ' Body' + JSON.stringify(req.body)//+' Param'+JSON.stringify(req.params)                                                                       ',60)+'--> res :'+(res.header ? res.statusCode : undefined);

};

exports.Left=Left;
exports.si=si;


