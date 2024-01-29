/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import {
  Controller, Get, Route, Tags, Middlewares, Request, Hidden, Body, Post,
} from 'tsoa';
import { Profile } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import GoogleAuthMiddleware from '../middlewares/GoogleAuthMiddleware';
import AuthService from '../services/AuthService';
import { ILocalAuthRequest } from '../models/ILocalAuthRequest';

@Route('auth')
@Tags('Auth')
export class AuthController extends Controller {
  private authService = new AuthService();

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

  @Post('login')
  public async login(@Body() request: ILocalAuthRequest): Promise<string> {
    const user = await this.authService.findUser(request);
    if (user) {
      const token = jwt.sign(user, process.env.JWTSECRETKEY || '', { expiresIn: '1h' });
      return Promise.resolve(token);
    }
    this.setStatus(401);
    return Promise.resolve('');
  }
}
