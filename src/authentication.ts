/* eslint-disable import/prefer-default-export */
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import EnumResponseError from './models/enums/EnumResponseError';
import ApiResponseError from './models/ApiResponseError';

export function expressAuthentication(
  request: express.Request,
  securityName: string, // eslint-disable-line @typescript-eslint/no-unused-vars
  scopes?: string[], // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<any> {
  const token = request.headers.authorization?.split(' ')[1] || '';
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWTSECRETKEY || '', (err: any, decoded: any) => {
      if (err) {
        reject(new ApiResponseError(EnumResponseError.PleaseLoginFirst));
      } else {
        if (!decoded.hasEmailVerified) {
          reject(new ApiResponseError(EnumResponseError.PleaseVerifyEmailFirst));
        }
        resolve(decoded);
      }
    });
  });
}
