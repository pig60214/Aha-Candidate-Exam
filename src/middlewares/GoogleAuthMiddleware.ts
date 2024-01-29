import passport from 'passport';

export default class GoogleAuthMiddleware {
  static Login = passport.authenticate('google', {
    scope: ['email', 'profile'],
  });

  static Callback = passport.authenticate('google', {
    failureRedirect: '/failed',
    session: false,
  });
}
