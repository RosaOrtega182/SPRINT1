////instanciamos router
const router=require('express').Router();
const cartController=require('../controllers/cart.controller');
//aplicarle rutas a esa instancia
router.get('/add/:idProducto',cartController.addToCart)
module.exports= router;