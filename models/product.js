const {DataTypes, Model}= require ('sequelize');
const sequelize= require('./conexion');


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


