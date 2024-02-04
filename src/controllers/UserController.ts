/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import {
  Controller, Get, Route, Tags, Security, Request, Post, Body,
} from 'tsoa';
import * as express from 'express';
import IUser from '../models/IUser';
import UserService from '../services/UserService';
import EnumResponseError from '../models/enums/EnumResponseError';
import IUpdatePasswordRequest, { UpdatePasswordRequest } from '../models/IUpdatePasswordRequest';
import { IUpdateUserNameRequest } from '../models/IUpdateUserNameRequest';
import ApiResponseError from '../models/ApiResponseError';
import ApiResponse from '../models/ApiResponse';

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
    throw new ApiResponseError(EnumResponseError.PleaseLoginFirst);
  }

  @Post('/update-name')
  public async updateName(@Request() request: express.Request, @Body() body: IUpdateUserNameRequest): Promise<ApiResponse> {
    const userFromToken = request.user as IUser;
    await this.userService.updateName(userFromToken.email, body.name);
    return new ApiResponse();
  }

  @Post('/update-password')
  public async updatePassword(@Request() request: express.Request, @Body() body: IUpdatePasswordRequest): Promise<ApiResponse> {
    const userFromToken = request.user as IUser;
    const bodyInstance = new UpdatePasswordRequest(body);
    if (bodyInstance.validatation !== EnumResponseError.Success) {
      throw new ApiResponseError(bodyInstance.validatation);
    }

    await this.userService.updatePassword(userFromToken.email, body.oldPassword, body.password);
    return new ApiResponse();
  }
}
