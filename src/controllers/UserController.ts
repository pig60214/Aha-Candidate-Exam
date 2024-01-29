/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import {
  Controller, Get, Route, Tags,
} from 'tsoa';
import ApiResponse from '../models/ApiResponse';

@Route('user')
@Tags('User')
export class UserController extends Controller {
  @Get('/test')
  public async test(): Promise<ApiResponse<string>> {
    return new ApiResponse(0, 'test');
  }
}
