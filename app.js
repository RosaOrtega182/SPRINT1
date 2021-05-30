const express= require('express');
const app= express();
const path= require('path');
const indexRouter=require('./routes/index.route');
const productRouter= require('./routes/product.route');
const carRouter=require('./routes/cart.route');
const checkRouter=require('./routes/checkout.route');
const adminProductRouter= require('./routes/admin.products.route');
const adminUserRouter=require('./routes/admin.users.route');
const adminCMSRouter= require('./routes/adminCMS.route');
const userRoute=require('./routes/user.route');
const session= require('express-session');
const flash=require('connect-flash');
const expressValidator = require('express-validator');
const passport= require('passport');
const bodyParser=require('body-parser');
const corsMiddleware= require('./middlewares/middleware.cors');
const limitMiddleware= require('./middlewares/middleware.limit');
const sequelize= require('./models/conexion');
const Producto= require('./models/product');
const User= require('./models/user');
const Category= require('./models/category');
const dotenv=require ('dotenv');
dotenv.config();

/*SERVICIO DE ARCHIVOS ESTATICOS
Para el servicio de archivos estáticos como, por ejemplo, imágenes, 
archivos CSS y archivos JavaScript, utilice la función de middleware incorporado express.static de Express. 
*/

app.use(express.static(path.join(__dirname,'assets')));
//app.use(express.static(path.join(__dirname,'img')));



/* MOTORES DE PLANTILLA
views: el directorio donde se encuentran los archivos de plantilla
view engine, el motor de plantilla que se utiliza*/

app.set ('view engine','ejs');
app.set('views','views');



/*MIDDLEWARES GLOBALES*/
app.use(express.json());//Leer o decodificar todos los json que lleguen en los request por medio de param o body


app.use(bodyParser.urlencoded({extended: false}));

//CORS
app.use(corsMiddleware);
//app.use(limitMiddleware.limiter);


app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));




/*MIDDLEWARE PARA CAPTURA DE ERRORES GLOBALES*/

app.use((err,req,res,next)=>
{
    console.log(err)
    if(!err)
    {
        return next();
    }

    return res.status(500).json(`Se produjo un error inesperado`)
});





// Express Validator middleware
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
                , root = namespace.shift()
                , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
   
}));


//config passport
require('./middlewares/middleware.passport')(passport);
// passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Express Messages middleware
app.use(flash());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});


//SET GLOBAL ERRORS VALIDATOR
app.locals.errors=null;


app.get('/*',function(req,res,next)
{
 res.locals.token= req.session.token;
 res.locals.cart=req.session.cart;
 res.locals.user=req.user || null;
 next();
});

app.use('/',indexRouter);
app.use('/product',productRouter);
app.use('/cart',carRouter);
app.use('/users',userRoute);
app.use('/checkout',checkRouter);
app.use('/admin/products',adminProductRouter);
app.use('/admin/users',adminUserRouter);
app.use('/admin',adminCMSRouter);



app.get('/error',(req,res,next)=>
{
    res.status(500);
    res.render('error.ejs',
    {
        pageTitle: "Error narf!"
    })

});




//app.get('/prueba',cors(middleware.corsOptions),(req,res)=>
app.get('/prueba',(req,res)=>
{
    let respuesta=
    {
        "estatus": "OK",
        "message": "Hola mundo NARF"
    }
    res.json(respuesta)
});


/*LEVANTAMOS SERVIDOR
app.listen(process.env.PORT,()=>{
    console.log(`Server started to listener on http://${process.env.HOST}:${process.env.PORT} yupi`);
});*/




async function inicioServidor()
{
    try
    {
        /* User.sync({ alter: true }): Esto verifica cuál es el estado actual de la tabla en la base de datos (qué columnas tiene, 
         cuáles son sus tipos de datos, etc.), y luego realiza los cambios necesarios en la tabla para que coincida con
          el modelo.*/
        await Producto.sync({alter:true});
        await User.sync({alter:true});
        await Category.sync({alter:true});
       
        await sequelize.authenticate();
        console.log("Se ha conectado a la Base de datos yujuuu");
        app.listen(process.env.PORT,()=>{
            console.log(`Server started to listener on http://${process.env.HOST}:${process.env.PORT} yupi`);
        })
    }
    catch(err)
    {
        console.log(err);
        console.log("No se pudo conectar con la base de datos");
    }
}



inicioServidor();