const MercadoLibre=require('../clases/mercadoLibre');
const Producto= require('../models/product')
const product = Producto.build();



exports.getAllProducts=async(req,res,next)=>
{

    //get id
    let id=req.params.id



    const instanceProductos = await product.getProductsInnerJoinByIdCategory(id);
    
    
   // const returnedTarget = Object.assign({}, instanceProductos);

      
      console.log('Ship Name:dlññññññññññññ', instanceProductos);
     // console.log('Ship Name:dlññññññññññññ', returnedTarget[0].nombre);
     
    



    //get products By IdCategory to Class
    MercadoLibre.getProductsByIdCategory(id)
    .then(products=>
    {
       //render
        res.render('product',
        {
            instanceProductos: instanceProductos,
            products: products
        });

    })
    .catch(err =>res.redirect("/error"));
   
}



exports.getProductDetail=async(req,res,next)=>
{
    var loggedIn = (req.isAuthenticated()) ? true : false;
    
    let idProducto=req.params.idProduct;

   let instanceProductos=await product.findByPrimaryKey(idProducto)

    MercadoLibre.getProductById(idProducto)
    .then(products=>
    {
        
        res.render('productDetail',
        {
            id: products[0].body.id,
            attributes:products[0].body.attributes,
            pictures: products[0].body.pictures,
            title: products[0].body.title,
            price: products[0].body.price,
            instanceProductos: instanceProductos,
            loggedIn: loggedIn
        });

    })
    .catch(err =>res.redirect("/error"));
   
}


exports.getSearch=(req,res,next)=>
{
  
    let searchWord=req.query.searchProduct;

    if(searchWord)
    {
        MercadoLibre.getProductsBySearch(searchWord)
        .then(products=>
        {

            res.render('product',
            {
                products: products
            });
              
        })

        .catch(err =>res.redirect("/error"));   
    }
    else
    {
        res.render('index');
    }

}