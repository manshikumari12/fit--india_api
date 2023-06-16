const passport=require("passport")
const {UserModel}=require("./model/user.model")
require("dotenv").config()
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID:"327928589362-mct8uq6f8s93kpo54d07othp7gncne58.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: "http://localhost:1111/auth/google/callback",
    passReqToCallback   : true
  },
  async function( accessToken, refreshToken, profile, cb) {
//   done(null,profile)


// await UserModel.insertMany([{ name: profile._json.name, email: profile._json.email, password: "123" }]);

// return cb(null, "user");
console.log(profile)
}


));

  module.exports={passport}