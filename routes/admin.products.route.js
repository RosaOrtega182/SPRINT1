////instanciamos router
const router=require('express').Router();
const adminProductsController=require('../controllers/admin.products.controller');
const midd = require('../middlewares/middleware.user');
var auth = require('../models/authenticaUser');
var isAdmin = auth.isAdmin;

router.get('/', isAdmin,midd.verificathionUsers,adminProductsController.getProductIndexes);
router.get('/addProduct',isAdmin,midd.verificathionUsers,adminProductsController.addProductGet);
router.post('/addProduct',adminProductsController.addProductPost);
router.get('/editProduct/:idProduct',isAdmin,midd.verificathionUsers,adminProductsController.editProductGet);
router.post('/editProduct/:idProduct',adminProductsController.editProductPost);
router.get('/deleteProduct/:idProduct',isAdmin,midd.verificathionUsers,adminProductsController.deleteProductGet);


//aplicarle rutas a esa instancia

module.exports= router;