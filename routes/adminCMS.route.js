////instanciamos router
const router=require('express').Router();
const adminCMSController=require('../controllers/adminCMS.controller');
const midd = require('../middlewares/middleware.user')

//aplicarle rutas a esa instancia*/
//router.get('/cms',midd.verificathionUsers,adminCMSController.showCMS);
router.get('/cms',adminCMSController.showCMS);




module.exports= router;