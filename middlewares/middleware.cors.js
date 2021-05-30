const cors=require('cors');

const corsOptions=
{
    origin: function(origin,callback)//origin es desde donde se está haciendo la petición
    {
        if(process.env.LISTABLANCA.indexOf(origin))
        {
            callback(null,true)
        }
        else
        {
            callback(new Error('Usted no esta autorizado a ingresar a mi API por Cors muajajajaja'));
        }
    }
}


module.exports= cors(corsOptions)