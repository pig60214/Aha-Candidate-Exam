/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import {
  Controller, Get, Route, Tags, Middlewares, Request, Hidden, Body, Post,
} from 'tsoa';
import { Profile } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import express from 'express';
import GoogleAuthMiddleware from '../middlewares/GoogleAuthMiddleware';
import AuthService from '../services/AuthService';
import { ILocalAuthRequest } from '../models/ILocalAuthRequest';
import IUser from '../models/IUser';
import EnumHttpStatus from '../models/enums/EnumHttpStatus';

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
  public callback(@Request() request: express.Request) {
    const profile = request.user as Profile;
    const user: IUser = {
      email: profile._json.email || '', /* eslint-disable-line no-underscore-dangle */
      name: profile.displayName,
    };
    const token = this.generateJwt(user);
    this.setStatus(302);
    const response = (<any>request).res as express.Response;
    response.redirect(`https://ahacandidateexam.retool.com/app/google-auth-callback?jwt=${token}`);
  }

  @Post('login')
  public async login(@Body() request: ILocalAuthRequest): Promise<string> {
    const user = await this.authService.findUser(request);
    if (user) {
      const token = this.generateJwt(user);
      return Promise.resolve(token);
    }
    this.setStatus(EnumHttpStatus.PleaseLoginFirst);
    return Promise.resolve('');
  }

  private generateJwt(user: IUser): string {
    return jwt.sign(user, process.env.JWTSECRETKEY || '');
  }
}
