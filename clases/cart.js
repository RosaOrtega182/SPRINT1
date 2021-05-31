let cart= null;

module.exports= class Cart
{
    static save(product, idProducto)
    {
        if (cart)
        {
            let newItem=true;
        
            for(var i=0; i< cart.length;i++)
            {
                if(cart[i].id==idProducto)
                {
                    cart[i].cuantity++;
                    newItem=false;
                    break;
                }
            }
        
            if(newItem)
            {
                cart.push(
                {
                    id: product[0].body.id,
                    image: product[0].body.thumbnail,
                    title: product[0].body.title,
                    price: product[0].body.price,
                    cuantity: 1
        
                });
            }

        }
        else
        {

            cart=[];
            cart.push(
            {
                id: product[0].body.id,
                image: product[0].body.thumbnail,
                title: product[0].body.title,
                price: product[0].body.price,
                cuantity: 1
            })

        }

    }



    static save2(product, idProducto)
    {
        if (cart)
        {
            let newItem=true;
        
            for(var i=0; i< cart.length;i++)
            {
                if(cart[i].id==idProducto)
                {
                    cart[i].cuantity++;
                    newItem=false;
                    break;
                }
            }
        
            if(newItem)
            {
                cart.push(
                {
                    id: product.id,
                    image: product.imagen,
                    title: product.nombre,
                    price: product.precio,
                    cuantity: 1
        
                });
            }

        }
        else
        {

            cart=[];
            cart.push(
            {
                id: product.id,
                image: product.imagen,
                title: product.nombre,
                price: product.precio,
                cuantity: 1
            })

        }

    }













    static addProduct(idProduUpdate)
    {
        for(let i=0;i < cart.length;i++)
        {
            if(cart[i].id==idProduUpdate)
            {
                cart[i].cuantity= cart[i].cuantity+1;
            }
        }

    }


    static removeProduct(idProduUpdate)
    {
        for(let i=0;i < cart.length;i++)
        {
            if(cart[i].id==idProduUpdate)
            {
                cart[i].cuantity=cart[i].cuantity-1;
                if(cart[i].cuantity < 1)
                {
                    cart.splice(i,1);
                }
            }
        }
    }  


    static removeProductsClear(idProduUpdate)
    {
        for(let i=0;i < cart.length;i++)
        {
            if(cart[i].id==idProduUpdate)
            {
                cart.splice(i,1);
            }
        }

    }


    static getCart()
    {
        return cart;
    }


}