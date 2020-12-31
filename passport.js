const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const User = require('./models/User');
const config = require('config');
const clientId = config.get('spotifyClientId');
const clientSecret = config.get('spotifyClientSecret');
const callbackUrl = config.get('spotifyCallbackUrl');

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
passport.use(
  new SpotifyStrategy(
    {
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: callbackUrl,
      passReqToCallback: true,
    },
    async function (req, accessToken, refreshToken, profile, done) {
      const username = req.user.username;

      try {
        let user = await User.findOne({ username: username });

        if (user) {
          await User.findOneAndUpdate(
            { username: username },
            { accessToken: accessToken, refreshToken: refreshToken }
          );

          return done(null, profile);
        }
        user = new User({
          username,
          accessToken,
          refreshToken,
        });

        await user.save();
      } catch (err) {
        console.error(err.message);
        return done(null, false);
      }
      return done(null, profile);
    }
  )
);
