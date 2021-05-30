const Cart= require(`../clases/cart`);

exports.getCart=(req,res,next)=>
{
    if(req.session.cart && req.session.cart.length == 0)
    {
        delete req.session.cart;
        res.redirect('/checkout');
    }
    else
    {
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

