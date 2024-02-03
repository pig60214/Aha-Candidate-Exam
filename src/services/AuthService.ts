/* eslint-disable class-methods-use-this */
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { ILocalAuthRequest } from '../models/ILocalAuthRequest';
import { ISignUpRequest } from '../models/ISignUpRequest';
import IUser from '../models/IUser';
import UserRepository from '../repositories/UserRepository';
import ApiResponseError from '../models/ApiResponseError';
import EnumResponseError from '../models/enums/EnumResponseError';

const USER_LIST = [
  {
    email: 'string',
    password: 'string',
    name: 'tttt',
    hasEmailVerified: true,
  },
  {
    email: 'string2',
    password: 'string',
    name: 'tttt2',
    hasEmailVerified: false,
  },
];
dotenv.config();
export default class AuthService {
  private userRepository = new UserRepository();

  async createUser(request: ISignUpRequest): Promise<IUser> {
    const user = await this.userRepository.createUser(request);
    await this.sendEmailVerification(request.email);
    return user;
  }

  async findUser(request: ILocalAuthRequest): Promise<IUser | undefined> {
    const user = USER_LIST.find((u) => u.email === request.email && u.password === request.password);
    return Promise.resolve(user);
  }

  generateJwt(object: any): string {
    return jwt.sign(object, process.env.JWTSECRETKEY || '');
  }

  decodeJwt(token: string): any {
    let payload = null;
    jwt.verify(token, process.env.JWTSECRETKEY || '', (err: any, decoded: any) => {
      if (!err) {
        payload = decoded;
      }
    });
    return payload;
  }

  async sendEmailVerification(email: string) {
    const transporter = nodemailer.createTransport({
      port: 465,
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.MAIL_ACCOUNT,
        pass: process.env.MAIL_PASSWORD,
      },
      secure: true,
    });

    const toke = this.generateJwt({ email, propose: 'Email Verification' });

    const mailData = {
      from: process.env.MAIL_ACCOUNT,
      to: email,
      subject: 'Email Verification',
      html: `<a href='${process.env.DOMAIN}/auth/verify-email/${toke}'>Click Link And Verify</a>`,
    };

    const info = await transporter.sendMail(mailData);

    if(!info.messageId) {
      throw new ApiResponseError(EnumResponseError.InternalError);
    }
  }

  async verifyEmail(token: string) {
    const result = this.decodeJwt(token);
    if (result) {
      const rowsUpdated = await this.userRepository.emailVerifiedSuccess(result.email);
      if (rowsUpdated === 0) {
        throw new ApiResponseError(EnumResponseError.PleaseSignUpFirst);
      }
    } else {
      throw new ApiResponseError(EnumResponseError.PleaseSignUpFirst);
    }
  }
}
