const fetch = require('node-fetch');
const idCat=[["Aves","MLM1100"],
             ["Conejos","MLM189310"],
             ["Equinos","MLM1117"],
             ["Gatos","MLM1081"],
             ["Insectos","MLM429307"],
             ["Peces","MLM1091"],
             ["Perros","MLM1072"],
             ["Reptiles","MLM1111"],
             ["Roedores","MLM1105"],
             ["Otros","MLM1126"]];

 //MLM1071  -- CATEGORIA ANIMALES Y MASCOTAS

module.exports=class MercadoLibre
{
   

    static getProductsByIdCategory(idCategoria)
    {

        var valorIdCategoria="";

        for(let i=0; i<idCat.length;i++)
        {
            if(idCat[i][0]==idCategoria)
            {
                valorIdCategoria=idCat[i][1];
                // console.log(valorIdCategoria);
            }
        }
  

        const url=`https://api.mercadolibre.com/sites/MLM/search?category=${valorIdCategoria}`;

        return new Promise((resolve,reject)=>
        {
            fetch(url)
            .then(response =>response.json())
            .then(data =>
            {
                resolve (data);
            })
            .catch(err=>reject(err))
        })
    
    }


    static getProductById(idProducto)
    {
        const url=`https://api.mercadolibre.com/items?ids=${idProducto}`;
 
        return new Promise((resolve,reject)=>
        {
            fetch(url)
            .then(response =>response.json())
            .then(data =>
            {
             resolve (data);
            })
            .catch(err=>reject(err))
        });

    }




    
    static getProductsBySearch(word)
    {
 
        const url=`https://api.mercadolibre.com/sites/MLM/search?category=MLM1071&q=${word}`;


        return new Promise((resolve,reject)=>
        {
            fetch(url)
            .then(response =>response.json())
            .then(data =>
            {
                resolve (data);
            })
            .catch(err=>reject(err))
        });

    }



} 

