////instanciamos router
const router=require('express').Router();
const userController=require('../controllers/user.controller');



//aplicarle rutas a esa instancia
router.get('/register',userController.registerUserGet);
router.post('/register',userController.registerAndAddUserPost);
router.get('/login',userController.loginUserGet);
router.post('/login',userController.loginUserPost);
router.get('/logout',userController.logoutUserGet);





module.exports= router;