const passport= require('passport');
const bcrypt= require('bcryptjs');
const User= require('../models/user')
const user = User.build();
const jwt = require('jsonwebtoken')
const dotenv=require ('dotenv');
dotenv.config();

/* GET LISTAR USUARIOS*/

exports.getUserIndexes=async(req,res,next)=>
{
    const listaProductos = await user.listAllUsers();
    const numRegistros= await user.countAllUsers();
 
    //res.send('admin area narf');
    res.render('admin/users',
    {
        todosLosUsuarios:listaProductos,
        cantidad: numRegistros
    });
   
}



/* GET ADDD USER*/
exports.addUserGet=(req,res,next)=>
{
   res.render('admin/addUser');
}


/* POST REGISTER AND ADD USER*/

exports.registerAndAddUserPost=async(req,res,next)=>
{
    let tipo;
    let nombre= req.body.nombre;
    let apellido= req.body.apellido;
    let email=req.body.email;
    let usuario=req.body.usuario;
    let password=req.body.password;
    let password2=req.body.password2;
    
    if(req.body.tipo)
    {
        tipo= req.body.tipo;
    }
    else
    {
        tipo=0
    }
   
    req.checkBody('nombre','El campo nombre debe de tener un valor').notEmpty();
    req.checkBody('apellido','El campo nombre debe de tener un valor').notEmpty();
    req.checkBody('email','El campo email debe de tener un valor').notEmpty();
    req.checkBody('email','El campo email debe de ser un mail valido').isEmail();
    req.checkBody('usuario','El campo usuario debe de tener un valor').notEmpty();
    req.checkBody('password','El campo contrasena debe de tener un valor').notEmpty();
    req.checkBody('password2','No coincide con su primera constraseña').equals(password);
   
   
    let errors= req.validationErrors();
   
    if(errors)
    {
        if(req.body.tipo)
        {
            res.render('admin/addUser',
            { 
                errors: errors,
                user: null
            }); 
        } 
        else
        {
            res.render('register',
            { 
                errors: errors,
                user: null
            });  
        }
    }
    else
    {

        const instanceFindFisrtMatch=  await user.findFirstMatch(usuario);
        {
            if(instanceFindFisrtMatch===null)
            {
                bcrypt.genSalt(10,function (err, salt) 
                {
                    bcrypt.hash(password, salt, async function (err, hash)
                    {
                        if (err)
                        {
                            console.log(err);
                        }
                    
                        password = hash;
                        const instanceaddUserCreate= await user.addUserCreate(nombre,apellido,email,usuario,password,tipo);

                        if (instanceaddUserCreate===null)
                        {
                            req.flash('danger','El usuario no se creo');
                        }
                        else
                        {
                            req.flash('success', 'Se creó satisfactoriamente el usuario!');
                            if(req.body.tipo)
                            {
                                res.redirect('/admin/users')
                            }
                            else
                            {
                                res.redirect('/users/login')
                            }
                        }
                    });
                });
            }
            else
            {
                req.flash('danger','El nombre de usuario ya existe, escoja otro.');
                if(req.body.tipo)
                {
                    res.redirect('/admin/users/addUser');
                }
                else
                {
                    res.redirect('users/register');
                }
                
            }
        }      
    }
}



/* GET  EDIT USER*/
exports.editUserGet= async(req,res,next)=>
{
   let idUser= req.params.idUser;
  

   const instanceUser2= await user.findByEdit(idUser);

  
    const instanceUser= Object.assign({}, instanceUser2);

  res.render('admin/editUser',
   {
       nombre: instanceUser[0].nombre,
       apellido: instanceUser[0].apellido,
       email: instanceUser[0].email,
       usuario: instanceUser[0].usuario,
       password: instanceUser[0].password,
       administrador: instanceUser[0].administrador,
       id: instanceUser[0].id


   });  
   
}




/* POST  EDIT USER*/


exports.editUserPost=async(req,res,next)=>
{
    req.checkBody('nombre','El campo nombre debe de tener un valor').notEmpty();
    req.checkBody('apellido','El campo nombre debe de tener un valor').notEmpty();
    req.checkBody('email','El campo descripcion debe de tener un valor').notEmpty();
    req.checkBody('usuario','El campo precio debe de tener un valor').notEmpty();
    req.checkBody('password','El campo imagen debe de tener un valor').notEmpty();
   
    let nombre= req.body.nombre;
    let apellido= req.body.apellido;
    let email=req.body.email;
    let usuario=req.body.usuario;
    let password=req.body.password;
    let administrador= req.body.tipo;
    var id = req.params.idUser;

   
    let errors= req.validationErrors();
   
    if(errors)
    {
        res.render('admin/editUser',
        {
            nombre: nombre,
            apellido: apellido,
            email: email,
            usuario: usuario,
            password: password,
            administrador: administrador,
            id: id,
            user: null
     
     
        });  
    }
    else
    {
       
        const cantity = await user.countAllUsersByUsername(usuario,id);


        if(cantity >= 1)
        {

            req.flash('danger','El nombre de usuario que eligió ya no se encuentra disponible');
            res.render('admin/editUser',
            {
                nombre: nombre,
                apellido: apellido,
                email: email,
                usuario: usuario,
                password: password,
                administrador: administrador,
                id: id,
                user : null
     
     
            });  
              
       
        }
        else
        {
          
            if(password.length>=30)
            {
                await  user.editUser(nombre,apellido,email,usuario,password,administrador,id)
                res.redirect('/admin/users')        // console.log("no se creo");s
            }
            else
            {
                bcrypt.genSalt(10,function (err, salt) 
                {
                    bcrypt.hash(password, salt, async function (err, hash)
                    {
                        if (err)
                        {
                            console.log(err);
                        }
                    
                        password = hash;
                        const instanceaddUserUpdated= await user.editUser(nombre,apellido,email,usuario,password,administrador,id);

                        if (instanceaddUserUpdated===null)
                        {
                            req.flash('danger','El usuario no se actualizo');
                        }
                        else
                        {
                            req.flash('success', 'Se actualizo el usuario!');
                          
                                res.redirect('/admin/users')
                          
                        }
                    });
                });

            }



           
        }
    }
}
  


/* GET DELETE USER*/
exports.deleteUserGet=async (req,res,next)=>
{
    let id = req.params.idUser;
    const instanceUser= await user.deleteUser(id) ;
    if(instanceUser===null)
    {
        req.flash('danger','El usuario no se elimino');
       
    }
    else
    {
        req.flash('success', 'Usuario eliminado!');
        res.redirect('/admin/users');
       
    }

}
















/* GET REGISTER USER*/
exports.registerUserGet=(req,res,next)=>
{
   res.render('register');
}

/* GET LOGIN*/
exports.loginUserGet=(req,res,next)=>
{
   if(res.locals.user) 
   {
       
       res.redirect('/');
   }
   res.render('login');
}


/* POST LOGIN*/
exports.loginUserPost=async (req,res,next)=>
{   /*let usuario=req.body.usuario;

    let token= await jwt.sign(
    {
        usuario
    }, process.env.SECRET_KEY,
    {
        expiresIn: '1h'
    })
 


    req.session.token=token;*/
 
    passport.authenticate('local', function(err, userio, info) {
        if (err) { return next(err); }
        if (!userio) 
        {
            req.flash('danger','usuario o contraseña incorrecto');
         res.redirect('/users/login');
        

    
         
        }
        else{

        req.logIn(userio, async function(err) {
            if (err) { return next(err); }
            let usuario= userio.username;
            let token= await jwt.sign(
                {
                    usuario
                }, process.env.SECRET_KEY,
                {
                    expiresIn: '1h'
                })
            
                req.session.token=token;
             
                   res.redirect('/')
             
             

          });
        }
           
        
       
      })(req, res, next);


  /*  passport.authenticate('local',
    { 

        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req,res,next);*/

}



/* GET LOGOUT*/
exports.logoutUserGet=(req,res,next)=>
{
    req.logout();
    delete req.session.token; 
    req.flash('success', 'Has cerrado sesión!');
    res.redirect('/users/login');
}
