////instanciamos router
const router=require('express').Router();
const adminProductsController=require('../controllers/admin.products.controller');

router.get('/', adminProductsController.getProductIndexes);
router.get('/addProduct',adminProductsController.addProductGet);
router.post('/addProduct',adminProductsController.addProductPost);
router.get('/editProduct/:idProduct',adminProductsController.editProductGet);
router.post('/editProduct/:idProduct',adminProductsController.editProductPost);
router.get('/deleteProduct/:idProduct',adminProductsController.deleteProductGet);


//aplicarle rutas a esa instancia

module.exports= router;