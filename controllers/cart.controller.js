const MercadoLibre= require(`../clases/mercadoLibre`);
const Cart= require('../clases/cart');

exports.addToCart=(req,res,next)=>
{
    let idProducto=req.params.idProducto
    MercadoLibre.getProductById(idProducto).then(products=>
        {
            Cart.save(products, idProducto);
            req.session.cart=Cart.getCart();
            //req.flash('success','Product added');
            res.redirect('back');
       
        });
   
}