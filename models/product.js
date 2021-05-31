const {DataTypes, Model}= require ('sequelize');
const sequelize= require('./conexion');
const Categoria= require('../models/category');


class Product extends Model 
{


    async listAllProducts()
    {
        return await Product.findAll();
    }

    async countAllProducts()
    {
        return await Product.count();
    }

    async addProduct(nombre,descripcion,precio,imagen,categoria)
    {
        return await Product.findOrCreate(
            {
                where: { nombre: nombre },
                defaults:
                {
                    nombre:nombre,
                    descripcion: descripcion,
                    precio: precio,
                    imagen: imagen,
                    idml: categoria
                }
            });
    }


    async findByPrimaryKey(id)
    {
        return await Product.findByPk(id);
    }



    async countAllProductsByName(nombre,id)
    {

        const Op = require('sequelize').Op;
       


        return await Product.count(
        {
            where:
            {
                nombre: nombre,
                id:  { [Op.ne]: id }
            }
        });

      
    }



    async editProduct(nombre,descripcion,precio,imagen,idml,id)
    {
        await Product.update({ nombre: nombre, descripcion: descripcion,precio:precio,imagen:imagen, idml: idml }, {
            where: {
              id:  id
            }
          });
    }


    async deleteProduct(idProduct)
    {
        await Product.destroy({
            where: {
              id: idProduct
            }
          });
    }


    async getProductsInnerJoinByIdCategory(idCategoria)
    {
        return await Product.findAll({
       
            raw: true,
        
            include: [
                {
                model: Categoria,
                where: {
                    nombre: idCategoria
                  },
                required: true 
                }]
                
          });
    }

    
}


Product.init({

    nombre:
    {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    descripcion:
    {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    precio:
    {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imagen:
    {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    idml://id de Mercado Libre que tiene la categoría
    {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, 
{ 
    sequelize,
    modelName: 'productos' 
});



module.exports=Product;


