////instanciamos router
const router=require('express').Router();
const userController=require('../controllers/user.controller');


//aplicarle rutas a esa instancia
//router.get('/', userController.getUserIndexes);
router.get('/',userController.getUserIndexes);
router.get('/addUser',userController.addUserGet);
router.post('/addUser',userController.registerAndAddUserPost);
router.get('/editUser/:idUser',userController.editUserGet);
router.post('/editUser/:idUser',userController.editUserPost);
router.get('/deleteUser/:idUser',userController.deleteUserGet);




module.exports= router;