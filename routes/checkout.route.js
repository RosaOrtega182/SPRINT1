////instanciamos router
const router=require('express').Router();
const checkoutController=require('../controllers/checkout.controller');
//aplicarle rutas a esa instancia
router.get('/',checkoutController.getCart)
//aplicarle rutas a esa instancia
router.get('/update/:idProduct',checkoutController.updateCart)

module.exports= router;



