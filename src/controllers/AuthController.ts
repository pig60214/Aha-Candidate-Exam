/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import {
  Controller, Get, Route, Tags, Middlewares, Request, Hidden,
} from 'tsoa';
import { Profile } from 'passport-google-oauth20';
import GoogleAuthMiddleware from '../middlewares/GoogleAuthMiddleware';

@Route('auth')
@Tags('Auth')
export class AuthController extends Controller {
  @Get('/google')
  @Middlewares(GoogleAuthMiddleware.Login)
  public googleAuth(): void {}

  @Get('/google/callback')
  @Hidden()
  @Middlewares(GoogleAuthMiddleware.Callback)
  public callback(@Request() request: Express.Request): string {
    const user = request.user as Profile;
    return `Welcome ${user.displayName}`;
  }
}
