import { HttpStatus, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { UserRepository } from 'src/user/user.repository';
import { SignupUserDto } from './dtos/signup-user.dto';
import { CheckOtpDto } from './dtos/check-otp.dto';
import { Request, Response } from 'express';
import { CustomHttpException } from 'src/filters/custom-http.exception';
import { TokenPayload } from './interface/token-payload.interface';
import { TokenType } from './enum/token-type.enum';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto } from './dtos/login-user.dto';
import { EmailConfirmationService } from 'src/email/email-confirmation.service';
import { UserDocument } from 'src/user/model/user.schema';
import { NodeEnvType } from 'src/constant/node-env.constant';


@Injectable()
export class AuthService {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailConfirmationService: EmailConfirmationService
  ) { }


  /**
   * Handles the signup process for a new user.
   */
  async signup(data: SignupUserDto, req: Request, res: Response) {

    const { email, fullname, password } = data

    const user = await this.userRepository.findOne({ email })

    if (user) {
      throw new CustomHttpException(HttpStatus.CONFLICT, 'user already exists')
    }

    const hashedPassword = await this.hashedPassword(password, 10)

    const otp = this.generate2FASCode(2)

    const newUser = await this.userRepository.create({
      email,
      fullname,
      password: hashedPassword,
      otp
    })

    if (process.env.NODE_ENV !== NodeEnvType.TEST) {
      await this.emailConfirmationService.sendCode(email, otp, 'welcome to finnotech shop')
    }

    const otpToken: string = this.signOtpToken(newUser.id);

    res.cookie("authorization", otpToken, {
      maxAge: 1000 * 2 * 60,
      httpOnly: true,
      secure: false,
      signed: true,
    })

    if (process.env.NODE_ENV === NodeEnvType.TEST) {
      return {
        otp: otp.code,
        otpToken
      }
    }

  }

  /**
   * Checks the OTP for user authentication.
   */
  async checkOtp(data: CheckOtpDto, user: UserDocument) {

    const { code } = data

    if (user.otp.isUsed) {
      throw new CustomHttpException(HttpStatus.UNAUTHORIZED, 'unauthorized');
    }

    if (user.otp.code !== code) {
      throw new CustomHttpException(HttpStatus.UNAUTHORIZED, 'unauthorized');
    }

    const now: Date = new Date();

    if (user.otp.expTime < now) {
      throw new CustomHttpException(HttpStatus.UNAUTHORIZED, 'unauthorized');
    }

    await this.userRepository.updateOne(user.id, { isVerified: true, otp: { isUsed: true } })

    return { user }

  }

  /**
   * Handles the login process for a verified user.
   */
  async login(data: LoginUserDto, req: Request, res: Response) {

    const { email, password } = data

    const user = await this.userRepository.findOne({ email, isVerified: true })

    if (!user) {
      throw new CustomHttpException(HttpStatus.NOT_FOUND, 'user not found')
    }

    const isCorrectPassword = await this.comparePassword(password, user.password)

    if (!isCorrectPassword) {
      throw new CustomHttpException(HttpStatus.NOT_FOUND, 'user not found')
    }

    const accessToken: string = this.signAccessToken(user.id);

    res.cookie("authorization", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      secure: false,
      signed: true,
    })

    res.cookie("isLoggedIn", "true", {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      sameSite: "strict"
    })

    return { user }

  }


  // ============= PRIVATE_METHODS =============

  /**
   * Signs an access token for user authentication.
   */
  private signAccessToken(userId: string) {

    const payload: TokenPayload = {
      userId,
      tokenType: TokenType.ACCESS_TOKEN
    }

    const options = {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME',)}d`,
    }

    return this.jwtService.sign(payload, options)

  }

  /**
   * Signs an otp token for user authentication.
   */
  private signOtpToken(userId: string) {

    const payload: TokenPayload = {
      userId,
      tokenType: TokenType.OTP_TOKEN
    }

    const options = {
      secret: this.configService.get('JWT_OTP_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_OTP_TOKEN_EXPIRATION_TIME',)}d`,
    }

    return this.jwtService.sign(payload, options)

  }

  /**
   * Generate otp code for new users
   */
  private generate2FASCode(expirationMinutes: number) {

    const code = Math.floor((Math.random() * 9000) + 1000).toString();

    const expTime = new Date(new Date().getTime() + expirationMinutes * 60000);

    return {
      code,
      expTime
    };
  }

  /**
   * Hash password to make a secure password
   */
  private hashedPassword(password: string, saltRounds: number) {

    const salt = bcrypt.genSaltSync(saltRounds);

    return bcrypt.hashSync(password, salt);

  }

  /**
   * Comparing user password with database hashed password
   */
  private async comparePassword(password: string, userPassword: string) {

    return bcrypt.compareSync(password, userPassword);

  }

}
