const Producto= require('../models/product')
const product = Producto.build();
const Categoria= require('../models/category');
const category = Categoria.build();

exports.getProductIndexes=async(req,res,next)=>
{
    
    const listaProductos = await product.listAllProducts();
    const numRegistros= await product.countAllProducts();
    //res.send('admin area narf');
    res.render('admin/products',
    {
        todosLosProductos:listaProductos,
        cantidad: numRegistros
    });
   
}


/* GET  ADD PRODUCT*/
exports.addProductGet=async(req,res,next)=>
{
    const instanceCategory= await category.listAllCategories();
    res.render('admin/addProduct',
    {
        categorias: instanceCategory     
    });
   
}

/* POST  ADD PRODUCT*/


exports.addProductPost=async(req,res,next)=>
{

  
    let nombre= req.body.nombre;
    let descripcion=req.body.descripcion;
    let precio=req.body.precio;
    let imagen=req.body.imagen;
    let categoria=req.body.categoria;


    req.checkBody('nombre','El campo nombre debe de tener un valor').notEmpty();
    req.checkBody('descripcion','El campo descripcion debe de tener un valor').notEmpty();
    req.checkBody('precio','El campo precio debe de tener un valor').notEmpty();
    req.checkBody('imagen','El campo imagen debe de tener un valor').notEmpty();
   
    

    let errors= req.validationErrors();
   
    if(errors)
    {
        const instanceCategory= await category.listAllCategories();
        res.render('admin/addProduct',
        {
            errors: errors,
            categorias: instanceCategory     
        });
         
    }
    else
    {
         
        let precio2= parseFloat(precio).toFixed(2);
        const [instance, wasCreated] = await product.addProduct(nombre,descripcion,precio,imagen,categoria);

        if(wasCreated)
        {
        // req.flash('success','Producto agregado troz');
            res.redirect('/admin/products')
                   // console.log("se creo");
        }
        else
        {
            req.flash('danger','Este producto ya ha sido creado');
            const instanceCategory2= await category.listAllCategories();
            res.render('admin/addProduct',
            {
                errors: errors,
                categorias: instanceCategory2     
            });
         
              

        }
    }
}
  
  
/* GET  EDIT PRODUCT*/
exports.editProductGet= async(req,res,next)=>
{      
    
   const idProducto= req.params.idProduct;
   const instanceCategory= await category.listAllCategories();
   const instanceProduct= await product.findByPrimaryKey(idProducto);

  res.render('admin/editProduct',
   {
       nombre: instanceProduct.nombre,
       descripcion: instanceProduct.descripcion,
       precio: instanceProduct.precio,
       imagen: instanceProduct.imagen,
       idml: instanceProduct.idml,
       categorias: instanceCategory,
       id: instanceProduct.id


   });  
   
}



/* POST  EDIT PRODUCT*/




exports.editProductPost=async(req,res,next)=>
{
    req.checkBody('nombre','El campo nombre debe de tener un valor').notEmpty();
    req.checkBody('descripcion','El campo descripcion debe de tener un valor').notEmpty();
    req.checkBody('precio','El campo precio debe de tener un valor').notEmpty();
    req.checkBody('imagen','El campo imagen debe de tener un valor').notEmpty();
   
    let nombre= req.body.nombre;
    let descripcion=req.body.descripcion;
    let precio=req.body.precio;
    let imagen=req.body.imagen;
    let idml= req.body.categoria;
    const id= req.params.idProduct;

   
    let errors= req.validationErrors();
   
    if(errors)
    {
        const instanceCategory= await category.listAllCategories();
        const instanceProduct= await product.findByPrimaryKey(idProducto);

        res.render('admin/editProduct',
        {
            nombre: instanceProduct.nombre,
            descripcion: instanceProduct.descripcion,
            precio: instanceProduct.precio,
            imagen: instanceProduct.imagen,
            idml: instanceProduct.idml,
            categorias: instanceCategory,
            id: instanceProduct.id,
            user : null


         });  
    }
    else
    {
        const cantity = await product.countAllProductsByName(nombre,id);
 
        


        if(cantity >= 1)
        {

            req.flash('danger','El nombre del producto ya ha sido creado');
            const instanceCategory= await category.listAllCategories();
            const instanceProduct= await product.findByPrimaryKey(id);
         
             res.render('admin/editProduct',
            {
                nombre: instanceProduct.nombre,
                descripcion: instanceProduct.descripcion,
                precio: instanceProduct.precio,
                imagen: instanceProduct.imagen,
                idml: instanceProduct.idml,
                categorias: instanceCategory,
                id: instanceProduct.id,
                user : null
         
            });  
              
      
        }
        else
        {
           
            await product.editProduct(nombre,descripcion,precio,imagen,idml,id);
            req.flash('success', 'Se actualizo el producto!');
            res.redirect('/admin/products')        
        }
    }
}
  



/* GET DELETE PRODUCT*/
exports.deleteProductGet=async (req,res,next)=>
{
    let id = req.params.idProduct;
    const instanceProduct= await product.deleteProduct(id) ;
    if(instanceProduct===null)
    {
        req.flash('danger','El producto no se elimino');
       
    }
    else
    {
        req.flash('success', 'Producto eliminado!');
        res.redirect('/admin/products');
       
    }

}


