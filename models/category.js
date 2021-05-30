const {DataTypes, Model}= require ('sequelize');
const sequelize= require('./conexion');


class Category extends Model 
{


    async listAllCategories()
    {
        return await Category.findAll();
    }

    async countAllCategories()
    {
        return await Category.count();
    }

   
    
}

Category.init({

    nombre:
    {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    idml:
    {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, 
{ 
    sequelize,
    modelName: 'categorias' 
});



module.exports=Category;


