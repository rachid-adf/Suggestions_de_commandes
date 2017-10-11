
exports.middleware_apply=function(mon_router) {
// ce qui arrive a ce niveau est une url qui n'existe pas dans le gestionnaire de routes
// catch 404 and forward to error handler
    mon_router.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        //console.error('Erreur ' + err.status + ' Url non trouvé');
        next(err);
    });


// development error handler, will print stacktrace
    if (mon_router.get('env') === 'development') {
        mon_router.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                //user: req.user.name,
                error: err
            });
        });
    }

// production error handler, no stacktraces leaked to user
    mon_router.use(function (err, req, res, next) {
        res.status(err.status || 500);

        res.render('error', {
            message: err.message,
            //user: req.user.name,
            error: {}
        });
    });
};