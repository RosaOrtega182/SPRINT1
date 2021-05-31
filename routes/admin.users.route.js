////instanciamos router
const router=require('express').Router();
const userController=require('../controllers/user.controller');
const midd = require('../middlewares/middleware.user')
var auth = require('../models/authenticaUser');
var isAdmin = auth.isAdmin;


//aplicarle rutas a esa instancia
//router.get('/', userController.getUserIndexes);
router.get('/',isAdmin,midd.verificathionUsers,userController.getUserIndexes);
router.get('/addUser',isAdmin,midd.verificathionUsers,userController.addUserGet);
router.post('/addUser',userController.registerAndAddUserPost);
router.get('/editUser/:idUser',isAdmin,midd.verificathionUsers,userController.editUserGet);
router.post('/editUser/:idUser',userController.editUserPost);
router.get('/deleteUser/:idUser',isAdmin,midd.verificathionUsers,userController.deleteUserGet);




module.exports= router;