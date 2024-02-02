/* eslint-disable import/prefer-default-export */
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import EnumHttpStatus from './models/enums/EnumHttpStatus';

export function expressAuthentication(
  request: express.Request,
  securityName: string, // eslint-disable-line @typescript-eslint/no-unused-vars
  scopes?: string[], // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<any> {
  const token = request.headers.authorization?.split(' ')[1] || '';
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWTSECRETKEY || '', (err: any, decoded: any) => {
      if (err) {
        reject({ status: EnumHttpStatus.PleaseLoginFirst }); // eslint-disable-line prefer-promise-reject-errors
      } else {
        resolve(decoded);
      }
    });
  });
}
