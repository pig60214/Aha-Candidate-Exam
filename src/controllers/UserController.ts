/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import {
  Controller, Get, Route, Tags, Security, Request,
} from 'tsoa';
import * as express from 'express';
import ApiResponse from '../models/ApiResponse';
import IUser from '../models/IUser';

@Route('user')
@Tags('User')
export class UserController extends Controller {
  @Get('/test')
  public async test(): Promise<ApiResponse<string>> {
    return new ApiResponse(0, 'test');
  }

  @Get('/test-after-login')
  @Security('BearerAuth')
  public async test2(@Request() request: express.Request): Promise<ApiResponse<string>> {
    const user = request.user as IUser;
    return new ApiResponse(0, `test-after-login by ${user.name}`);
  }
}
