import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';
import { ConfigService } from '@nestjs/config';
import { TokenType } from 'src/auth/enum/token-type.enum';
import { CustomHttpException } from 'src/filters/custom-http.exception';

/**
 * Decorate the AuthGuard class with the @Injectable() decorator to make it injectable.
 */
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService
  ) { }

  /**
   * Implement the canActivate() method as required by the CanActivate interface.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {

    /**
     * Obtain the HTTP request object from the execution context.
     */
    const request = context.switchToHttp().getRequest();

    const token = request.signedCookies.authorization || request.headers.authorization;

    if (!token) {
      throw new CustomHttpException(HttpStatus.UNAUTHORIZED, 'unauthorized');
    }

    try {

      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get("JWT_SECRET"),
      });

      const { userId, tokenType } = payload;

      if (tokenType !== TokenType.ACCESS_TOKEN) {
        throw new CustomHttpException(HttpStatus.UNAUTHORIZED, 'unauthorized');
      }

      const user = await this.userRepository.findById(userId);

      if (!user) {
        throw new CustomHttpException(HttpStatus.UNAUTHORIZED, 'unauthorized');
      }

      request['user'] = user;

    } catch (err: any) {

      throw new CustomHttpException(HttpStatus.UNAUTHORIZED, 'unauthorized');

    }

    return true;

  }

}
