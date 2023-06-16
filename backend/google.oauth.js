const passport=require("passport")
const {UserModel}=require("./model/user.model")
require("dotenv").config()
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID:"327928589362-7j03ok3nd2o065an2r6405umkhseos9r.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: "http://localhost:1111/auth/google/callback",
    passReqToCallback   : true
  },
  async function( accessToken, refreshToken, profile, cb) {
//   done(null,profile)


await UserModel.insertMany([{ name: profile._json.name, email: profile._json.email, password: "123" }]);
return cb(null, "user");
}


));

  module.exports={passport}