////instanciamos router
const router=require('express').Router();
const adminCMSController=require('../controllers/adminCMS.controller');
const midd = require('../middlewares/middleware.user')
var auth = require('../models/authenticaUser');
var isAdmin = auth.isAdmin;

//aplicarle rutas a esa instancia*/
//router.get('/cms',midd.verificathionUsers,adminCMSController.showCMS);
router.get('/cms',midd.verificathionUsers,isAdmin,adminCMSController.showCMS);




module.exports= router;