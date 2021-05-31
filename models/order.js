const {DataTypes, Model}= require ('sequelize');
const sequelize= require('./conexion');


class Orders extends Model 
{

    async addOrderCreate(nombre,direccion, iduser)
    {
        return await Orders.create(
        {
            nombre: nombre,
            direccion: direccion,
            iduser: iduser
        });

    }

   
    
}

Orders.init({

    nombre:
    {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    direccion:
    {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    iduser:
    {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    
}, 
{ 
    sequelize,
    modelName: 'ventas' 
});



module.exports=Orders;
