const rateLimit= require('express-rate-limit');

const limiter=rateLimit({
    windowMs: 15*60*1000, //Limitar tiempo de acceso a 15 minutos
    max:10,// limite  por cada IP a 10 request
    message: "Usted extendio el límite de accesos a la IP narf, troz"
});

module.exports= {limiter}