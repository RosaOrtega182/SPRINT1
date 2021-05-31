const jwt = require('jsonwebtoken')
const dotenv=require ('dotenv');
dotenv.config();




module.exports.verificathionUsers = async (req,res,next)=>
{
    
    let token = req.session.token
    
    if (token != undefined)
    {
      
        let resultado = jwt.verify(token, process.env.SECRET_KEY);
      
      
        if (resultado)
        {
            return next();
        }
        else 
        {
            throw new Error ('Token no valido')
        }
    }
    else 
    {
        req.flash('danger', 'Este sistema es privado y seguro, necesita un Token para ingresar');
        res.redirect('/users/login');
     

        //res.status(400).json('Este sistema es privado y seguro, necesita un Token para ingresar')
    }
}