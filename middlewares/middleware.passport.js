var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
const user = User.build();
const jwt = require('jsonwebtoken')

module.exports = function (passport) 
{
    passport.use(new LocalStrategy( async function (username, password, done) 
    {
      let instance;
      try 
      {
        instance= await user.findFirstMatch(username);
        if (!instance) 
        {
          return done(null, false, {message: 'No user by that username'});
        }
        } 
        catch (e) 
        {
            return done(e);
        }
      
        const match = await user.compareAsync(password, instance.password);

        if (!match) 
        {
          return done(null, false, {message: 'Not a matching password'});
        }
    
       
        return done(null, instance);
        

    }));


    passport.serializeUser( function (instance, done) 
    {
     
      
        done(null, instance.id);
    });

    passport.deserializeUser(async function (id, done) 
    {
      try 
      {
        let user2 = await user.findByPrimaryKey(id);
        if (!user2) 
        {
          return done(new Error('user not found'));
        }
        done(null, user2);
      } 
      catch (e) 
      {
        done(e);
      }
        
    });

}