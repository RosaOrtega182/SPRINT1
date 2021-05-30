exports.isUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('danger', 'Debes iniciar sesion.');
        res.redirect('/users/login');
    }
}

exports.isAdmin = function(req, res, next) {
    if (req.isAuthenticated() && res.locals.user.administrador == 1) {
        next();
    } else {
        req.flash('danger', 'Debes iniciar sesión como administrador');
        res.redirect('/users/login');
    }
}