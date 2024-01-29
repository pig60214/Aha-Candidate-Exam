import GoogleStrategy from 'passport-google-oauth20';
import dotenv from 'dotenv';

dotenv.config();

const googleStrategy = new GoogleStrategy.Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: `${process.env.DOMAIN}/auth/google/callback`,
    passReqToCallback: true,
  },
  (request, accessToken, refreshToken, profile, done) => done(null, profile),
);

export default googleStrategy;
