const {DataTypes, Model}= require ('sequelize');
const sequelize= require('./conexion');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const dotenv=require ('dotenv');
dotenv.config();


class User extends Model 
{
    async listAllUsers()
    {
        return await User.findAll();
    }


    async countAllUsers()
    {
        return await User.count();
    }

    async addUserFindOrCreate(nombre, email, usuario, password)
    {
        return await User.findOrCreate(
        {
            where: 
            {
                usuario: usuario 
            },
            defaults:
            {
                nombre: nombre,
                email: email,
                usuario:usuario,
                password: password,
                administrador: 1
            }
        });
    }

/*FUNCTION ADDUSERCREATE
Sequelize proporciona el método create, que combina los métodos build y save en un solo método:
*/

    async addUserCreate(nombre,apellido, email, usuario, password,tipo)
    {
        return await User.create(
        {
            nombre: nombre,
            apellido:apellido,
            email: email,
            usuario:usuario,
            password: password,
            administrador: tipo
        });

    }



/*FUNCION FINDFIRSTMATCH
Aquí el findOne método obtiene la primera entrada que encuentra (que cumple con las opciones de consulta opcionales, 
si se proporcionan).*/

    async  findFirstMatch(usuario)
    {
        return await User.findOne(
        { 
            where: 
            { 
                usuario: usuario 
            } 
        });
        
    }

/*FUNCION FINDBYPRIMARYKEY
Aquí el findByPk método obtiene solo una entrada de la tabla, utilizando la clave primaria proporcionada. 
*/
    async findByPrimaryKey(id)
    {
        return await User.findByPk(id);
    }



    async findByEdit(idUser)
    {
        return await User.findAll(
        {
            where: 
            {
              id: idUser
            }
        });
    }



    async editUser(nombre,apellido,email,usuario,password,administrador,id)
    {
        await User.update({ nombre: nombre, apellido: apellido,email: email,usuario:usuario,password:password,administrador:administrador }, {
            where: {
              id:  id
            }
          });
    }


    async countAllUsersByUsername(usuario,id)
    {

        const Op = require('sequelize').Op;
       


        return await User.count(
        {
            where:
            {
                usuario: usuario,
                id:  { [Op.ne]: id }
            }
        });

      
    }




    async deleteUser(idUser)
    {
        await User.destroy({
            where: {
              id: idUser
            }
          });
    }



    compareAsync(param1, param2) 
    {
        return new Promise(function(resolve, reject) 
        {
            bcrypt.compare(param1, param2, function(err, res) 
            {
                if (err) 
                {
                     reject(err);
                } else 
                {
                     resolve(res);
                }
            });
        });
    }



    async generaToken (data)
    {
        try {
            let resultado = jwt.sign({
                data}, process.env.SECRET_KEY
            )
            return resultado
        }catch (err){
            console.log(err)
            throw new Error (err)
        }
    }







}






User.init(
{

    nombre:
    {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    apellido:
    {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email:
    {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    usuario:
    {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    password:
    {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    administrador:
    {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, 
{ 
    sequelize,
    modelName: 'usuarios' 
});



module.exports=User;


