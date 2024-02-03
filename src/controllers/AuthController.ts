/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import {
  Controller, Get, Route, Tags, Middlewares, Request, Hidden, Body, Post,
} from 'tsoa';
import { Profile } from 'passport-google-oauth20';
import express from 'express';
import GoogleAuthMiddleware from '../middlewares/GoogleAuthMiddleware';
import AuthService from '../services/AuthService';
import { ILocalAuthRequest } from '../models/ILocalAuthRequest';
import IUser from '../models/IUser';
import EnumResponseError from '../models/enums/EnumResponseError';
import { ISignUpRequest, SignUpRequest } from '../models/ISignUpRequest';
import ApiResponseError from '../models/ApiResponseError';
import ApiResponse from '../models/ApiResponse';
import validationHelper from '../helpers/validationHelper';
import { ILoginResponse } from '../models/ILoginResponse';

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
      hasEmailVerified: true,
    };
    const token = this.authService.generateJwt(user);
    this.setStatus(302);
    const response = (<any>request).res as express.Response;
    response.redirect(`https://ahacandidateexam.retool.com/app/google-auth-callback?jwt=${token}`);
  }

  @Post('login')
  public async login(@Body() request: ILocalAuthRequest): Promise<ILoginResponse> {
    const token = await this.authService.login(request);
    return token;
  }

  @Post('sign-up')
  public async SignUp(@Body() request: ISignUpRequest): Promise<string> {
    const requestInstance = new SignUpRequest(request);
    if (requestInstance.validatation !== EnumResponseError.Success) {
      throw new ApiResponseError(requestInstance.validatation);
    }

    const user = await this.authService.createUser(request);
    const token = this.authService.generateJwt(user);
    return token;
  }

  @Get('/send-email-verification/{email}')
  public async sendEmailVerification(email: string): Promise<ApiResponse> {
    const validatation = validationHelper.isValidEmail(email);
    if (validatation !== EnumResponseError.Success) {
      throw new ApiResponseError(EnumResponseError.EmailFormatWrong);
    }

    await this.authService.sendEmailVerification(email);
    return new ApiResponse();
  }

  @Get('/verify-email/{token}')
  public async verifyEmail(@Request() request: express.Request, token: string) {
    await this.authService.verifyEmail(token);
    this.setStatus(302)
    const response = (<any>request).res as express.Response;
    response.redirect(`https://ahacandidateexam.retool.com/app/login`);
  }
}

