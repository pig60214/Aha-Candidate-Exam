/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import {
  Controller, Get, Route, Tags, Security, Request,
} from 'tsoa';
import * as express from 'express';
import ApiResponse from '../models/ApiResponse';
import IUser from '../models/IUser';
import UserService from '../services/UserService';

@Route('user')
@Tags('User')
export class UserController extends Controller {
  private userService = new UserService();

  @Get('/test')
  public async test(): Promise<ApiResponse<string>> {
    return new ApiResponse(0, 'test');
  }

  @Get('/get-profile')
  @Security('BearerAuth')
  public async getUserProfile(@Request() request: express.Request): Promise<ApiResponse<IUser>> {
    const userFromToken = request.user as IUser;
    const user = await this.userService.getUserProfile(userFromToken.email);
    if(user) {
      return new ApiResponse(0, user);
    }
    this.setStatus(401);
    return new ApiResponse(0, {} as IUser);
  }
}
