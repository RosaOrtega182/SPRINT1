////instanciamos router
const router=require('express').Router();
const productController=require('../controllers/product.controller');
//aplicarle rutas a esa instancia
router.get('/:id',productController.getAllProducts);
router.get('/PageDetails/:idProduct',productController.getProductDetail);
router.get('/',productController.getSearch);
module.exports= router;