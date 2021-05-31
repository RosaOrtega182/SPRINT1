const MercadoLibre= require(`../clases/mercadoLibre`);
const Cart= require('../clases/cart');
const Producto= require('../models/product')
const product = Producto.build();

exports.addToCart=async(req,res,next)=>
{
    let idProducto=req.params.idProducto

    if(idProducto.includes('M'))
    {
        MercadoLibre.getProductById(idProducto).then(products=>
            {
                Cart.save(products, idProducto);
                req.session.cart=Cart.getCart();
                //req.flash('success','Product added');
                res.redirect('back');
           
            });
    }
    else
    {
        instanceProductos=await product.findByPrimaryKey(idProducto);
        Cart.save2(instanceProductos, idProducto);
        req.session.cart=Cart.getCart();
                //req.flash('success','Product added');
                res.redirect('back');
    }

   
   
}