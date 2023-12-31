
const passport=require("passport")
const {UserModel}=require("./model/user.model");
require("dotenv").config()
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
passport.serializeUser((user, done) => {
	// console.log(user);
	done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
	const user = await UserModel.findOne({ email: email });
	done(null, user);
});
passport.use(
	new GoogleStrategy(
		{
			clientID:"404575401589-l7bt9o0g15d7absejdn6vr0emk2jst00.apps.googleusercontent.com",
			clientSecret: "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",
			callbackURL: "http://localhost:1111/auth/google/callback",
			passReqToCallback: true,
		},
		// async (accessToken, refreshToken, profile, done) => {
		// 	// Check if the user already exists in the database

		// 	console.log(profile);
		// 	const existingUser = await UserModel.findOne({ googleId: profile.id });
		// 	if (existingUser) {
		// 		console.log("User found:", existingUser);
		// 		return done(null, existingUser);
		// 	}

		// 	// Create a new user if the user does not exist
		// 	const newUser = await UserModel.create({ googleId: profile.id });
		// 	console.log("New user created:", newUser);
		// 	return done(null, newUser);
		// }

		async (request, accessToken, refreshToken, profile, done) => {
			//Register user here
			// console.log(request);
			done(null, profile);

			const cUser = await UserModel.findOne({ email: profile.email });
			// console.log("current user :", cUser);
			if (!cUser) {
				const newUser = {
					email: profile.email,
					name: `${profile.name.givenName} ${profile.name.familyName}`,
					password: profile.id,
				};

				// bcrypt.hash(password, 5, async (err, hash) => {
				// 	const newUser = UserModel({ email :profile.email, name: profile.name, password: hash, role });
				// 	await newUser.save();
				// 	res.status(200).send({ msg: "Registration Successful" });
				// });

				const data = await UserModel.create(newUser);
				// console.log("New user created:", newUser);
				request.body = newUser;
				return done(null, newUser);
			} else {
				request.body = cUser;
			}
		}
	)
);

const googleAuthentication = async (req, res) => {

  // Successful authentication, redirect home.

  // console.log(req.user)

  const user = req.user

  // let token = jwt.sign({ UserID: user._id}, process.env.SecretKey, { expiresIn: "24h" })

  // const frontendURL = `https://qr-insight-craft.netlify.app/`

  const frontendURL = "http://127.0.0.1:5502/frontend/index.html"

  res.send(`
              <a href="${frontendURL}?userID=${user._id}" id="myid" style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #222222; margin: 0; padding: 0; overflow: scroll;">
                  <img style="width:100%;" src="https://cdn.dribbble.com/users/1787505/screenshots/7300251/media/a351d9e0236c03a539181b95faced9e0.gif" alt="https://i.pinimg.com/originals/c7/e1/b7/c7e1b7b5753737039e1bdbda578132b8.gif">
              </a>
              <script>
                  let a = document.getElementById('myid')
                  setTimeout(()=>{
                      a.click()
                  },2000)
                  console.log(a)
              </script>
      `)

}


  module.exports={passport,googleAuthentication}