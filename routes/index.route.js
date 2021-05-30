////instanciamos router
const router=require('express').Router();
const indexController=require('../controllers/index.controller');
//aplicarle rutas a esa instancia
router.get('/',indexController.getIndex)
module.exports= router;