

var _i18n=require('i18n');


//var app=require('../app');


_i18n.config_and_init=function(_router) {
    _i18n.configure({
        locales: ['en','fr'],
        fallbacks: {'en': 'fr'},
        cookie: 'locale',
//define the default language
        defaultLocale: 'fr',
        directory: "" + process.cwd() + "/locales"
    });
    _router.use(_i18n.init);
 
};


_i18n.middleware_apply=function(_router) {
    _router.use(function (req, res, next) {
        hbs.registerHelper('__', function () {
            return _i18n.__.apply(req, arguments);
        });
        hbs.registerHelper('__n', function () {
            return _i18n.__n.apply(req, arguments);
        });
        next();
    });
};

module.exports=_i18n;