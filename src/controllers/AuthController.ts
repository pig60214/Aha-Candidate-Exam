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

  /**
   * sign-up/in by google auth, and then redirect to retool google-auth-callback page with token<br>
   * redirect to: https://ahacandidateexam.retool.com/p/google-auth-callback?jwt={token}<br>
   * token: Put in request header. header['authorization'] = 'bearer ${token}'
   */
  @Get('/google')
  @Middlewares(GoogleAuthMiddleware.Login)
  public googleAuth(): void {}

  @Get('/google/callback')
  @Hidden()
  @Middlewares(GoogleAuthMiddleware.Callback)
  public async callback(@Request() request: express.Request) {
    const profile = request.user as Profile;
    const email = profile._json.email || ''; /* eslint-disable-line no-underscore-dangle */
    const name = profile.displayName;
    const token = await this.authService.loginFromGoogleAuth(email, name);
    this.setStatus(302);
    const response = (<any>request).res as express.Response;
    response.redirect(`https://ahacandidateexam.retool.com/p/google-auth-callback?jwt=${token}`);
  }

  @Post('login')
  public async login(@Body() request: ILocalAuthRequest): Promise<ILoginResponse> {
    const token = await this.authService.login(request);
    return token;
  }

  @Post('sign-up')
  public async SignUp(@Body() request: ISignUpRequest) {
    const requestInstance = new SignUpRequest(request);
    if (requestInstance.validatation !== EnumResponseError.Success) {
      throw new ApiResponseError(requestInstance.validatation);
    }

    await this.authService.createUser(request);
  }

  /**
   * Send a email verification to the email
   * @param email send verification to this email
   */
  @Get('/send-email-verification/{email}')
  public async sendEmailVerification(email: string): Promise<ApiResponse> {
    const validatation = validationHelper.isValidEmail(email);
    if (validatation !== EnumResponseError.Success) {
      throw new ApiResponseError(EnumResponseError.EmailFormatWrong);
    }

    await this.authService.sendEmailVerification(email);
    return new ApiResponse();
  }

  /**
   * Verify a email address by token, and then redirect to retool after-verify-email page.<br>
   * redirect to: https://ahacandidateexam.retool.com/p/after-verify-email?data={data}<br>
   * data: ILoginResponse
   * @param token generated in /auth/send-email-verification api
   */
  @Get('/verify-email/{token}')
  public async verifyEmail(@Request() request: express.Request, token: string) {
    const result = await this.authService.verifyEmail(token);
    this.setStatus(302);
    const response = (<any>request).res as express.Response;
    response.redirect(`https://ahacandidateexam.retool.com/p/after-verify-email?data=${encodeURIComponent(JSON.stringify(result))}`);
  }
}
