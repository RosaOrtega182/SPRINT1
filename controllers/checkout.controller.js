const { render } = require("ejs");
const Cart= require(`../clases/cart`);
const User= require('../models/user')
const user = User.build();
const Order= require('../models/order');
const order= Order.build();

exports.getCart=(req,res,next)=>
{
    if(req.session.cart && req.session.cart.length == 0)
    {
        delete req.session.cart;
        res.redirect('/checkout');
    }
    else
    {
        //console.log("AAAAAAAAAAAAAAAAAAAA"+req.user.usuario);
    
        res.render('checkout',
        {
            cart: req.session.cart
        });
    }
}


exports.updateCart=(req,res,next)=>
{
    var idProduUpdate=req.params.idProduct ;
    var action=req.query.action;
   
    if(action =="add")
    {
        Cart.addProduct(idProduUpdate);
    }
    else if(action=="remove")
    {
        Cart.removeProduct(idProduUpdate);     
    }
    else if(action=="clear")
    {
        Cart.removeProductsClear(idProduUpdate);
        let cart= Cart.getCart();
        if(cart.length == 0)
        {
            delete req.session.cart;
        }
    }
    else
    { 
        console.log("Error al actualizar");
    }

        
    req.session.cart=Cart.getCart();

    res.redirect('/checkout');
}


exports.buyCartGet=async(req,res,next)=>
{
    //console.log("AAAAAAAAAAAAAAAAAAAA"+req.user.usuario);
    const instanceUser= await user.findFirstMatch(req.user.usuario) ;
    res.render('order',{
        nombre:instanceUser.nombre,
        apellido: instanceUser.apellido ,
        cart: req.session.cart
    })
    
}





exports.buyCartPost=async(req,res,next)=>
{

  
    let nombre= req.body.nombre;
    let direccion=req.body.direccion;
   


    req.checkBody('nombre','El campo nombre debe de tener un valor').notEmpty();
    req.checkBody('direccion','El campo direccion debe de tener un valor').notEmpty();
    
   
    

    let errors= req.validationErrors();
   
    if(errors)
    {

        const instanceUser= await user.findFirstMatch(req.user.usuario) ;
    res.render('order',{
        errors: errors,
        nombre:instanceUser.nombre,
        apellido: instanceUser.apellido,
        user:null 
    })
       
         
    }
    else
    {
        const instanceUser2= await user.findFirstMatch(req.user.usuario) ;
        
        const instanceaddOrderCreate=await Order.create(
            {
                nombre: nombre,
                direccion: direccion,
                iduser: instanceUser2.id
            });
        if(instanceaddOrderCreate===null)
        {
        // req.flash('success','Producto agregado troz');
        req.flash('danger','La orden no se realizó');
                    
        }
        else
        {
            req.flash('success', 'Se a realizado exitosamente su compra!');
            delete req.session.cart;
             res.redirect('/'); 

        }
    }
}
  