/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import {
  Controller, Get, Route, Tags, Security, Request, Post, Body,
} from 'tsoa';
import * as express from 'express';
import IUser from '../models/IUser';
import UserService from '../services/UserService';
import EnumResponseError from '../models/enums/EnumResponseError';
import ApiResponse from '../models/ApiResponse';
import { IUpdateUserNameRequest } from '../models/IUpdateUserNameRequest';

@Route('user')
@Tags('User')
@Security('BearerAuth')
export class UserController extends Controller {
  private userService = new UserService();

  @Get('/get-profile')
  public async getUserProfile(@Request() request: express.Request): Promise<IUser> {
    const userFromToken = request.user as IUser;
    const user = await this.userService.getUserProfile(userFromToken.email);
    if (user) {
      return user;
    }
    this.setStatus(401);
    return {} as IUser;
  }

  @Post('/update-name')
  public async updateUserName(@Request() request: express.Request, @Body() body: IUpdateUserNameRequest): Promise<ApiResponse> {
    const userFromToken = request.user as IUser;
    const result: boolean = await this.userService.updateUserName(userFromToken.email, body.name);
    if (result) {
      return new ApiResponse(EnumResponseError.Success);
    }
    this.setStatus(500);
    return new ApiResponse(EnumResponseError.UpdateUserNameFail);
  }
}
