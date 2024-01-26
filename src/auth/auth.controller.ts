import { Controller, ClassSerializerInterceptor, UseInterceptors, Post, Body, Res, Req, UseGuards } from '@nestjs/common'
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service'
import { Request, Response } from 'express';
import { SignupUserDto } from './dtos/signup-user.dto';
import { BadRequestError, ExpiredError, InternalServerError, UnAuthorizedError, UnprocessableEntityError, NotFoundError } from 'src/docs/errors.response';
import { CheckOtpResponse, LoginUserResponse, SignupUsersResponse } from './docs/success-auth.response';
import { LoginUserDto } from './dtos/login-user.dto';
import { CheckOtpDto } from './dtos/check-otp.dto';
import { RequestWithUser } from './interface/request-with-user.interface';
import { OtpGuard } from 'src/guards/otp.guard';


/**
 * Swagger tag for categories this controller
 */
@ApiTags('Authentication')
/**
 * for serialization response  
 */
@UseInterceptors(ClassSerializerInterceptor)
/**
 * Auth Controller
 * 
 * this class is used to redirect auth routes to specific services
 * 
 * all routes that start with 'api/v1/auth' enter into this controller
*/
@Controller('api/v1/auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) { }


  // ============= SINGUP =============

  /**
   * signup user
  */
  @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
  @ApiOperation({ summary: 'create user' })
  @ApiResponse({
    status: 200,
    description: 'success response',
    type: SignupUsersResponse
  })
  @ApiResponse({
    status: 422,
    description: 'validation error',
    type: UnprocessableEntityError
  })
  @ApiResponse({
    status: 401,
    description: 'unauthorized',
    type: UnAuthorizedError
  })
  @ApiResponse({
    status: 500,
    description: 'internal server error',
    type: InternalServerError
  })
  @ApiResponse({
    status: 400,
    description: 'bad request',
    type: BadRequestError
  })
  @Post('signup')
  async signup(@Body() body: SignupUserDto, @Req() req: RequestWithUser, @Res() res: Response) {

    const data = await this.authService.signup(body, req, res)

    res.status(200).json({
      status: 200,
      success: true,
      message: 'user successfully created',
      data
    })

  }


  // ============= CHECK_OTP =============

  /**
   * check user otp
  */
  @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
  @ApiOperation({ summary: 'check user otp' })
  @ApiResponse({
    status: 200,
    description: 'success response',
    type: CheckOtpResponse
  })
  @ApiResponse({
    status: 422,
    description: 'validation error',
    type: UnprocessableEntityError
  })
  @ApiResponse({
    status: 404,
    description: 'user not found',
    type: NotFoundError
  })
  @ApiResponse({
    status: 410,
    description: 'code expired',
    type: ExpiredError
  })
  @ApiResponse({
    status: 401,
    description: 'entered code is wrong',
    type: UnAuthorizedError
  })
  @ApiResponse({
    status: 500,
    description: 'internal server error',
    type: InternalServerError
  })
  @ApiResponse({
    status: 400,
    description: 'bad request',
    type: BadRequestError
  })
  @UseGuards(OtpGuard)
  @Post('check-otp')
  async checkOtp(@Body() body: CheckOtpDto, @Req() req: RequestWithUser, @Res() res: Response) {

    const { user } = req
    const data = await this.authService.checkOtp(body, user)

    res.status(200).json({
      status: 200,
      success: true,
      message: 'code has been successfully verified',
    })

  }


  // ============= LOGIN =============

  /**
   * login user
  */
  @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
  @ApiOperation({ summary: 'login user' })
  @ApiResponse({
    status: 200,
    description: 'success response',
    type: LoginUserResponse
  })
  @ApiResponse({
    status: 422,
    description: 'validation error',
    type: UnprocessableEntityError
  })
  @ApiResponse({
    status: 401,
    description: 'unauthorized',
    type: UnAuthorizedError
  })
  @ApiResponse({
    status: 404,
    description: 'user not found',
    type: NotFoundError
  })
  @ApiResponse({
    status: 500,
    description: 'internal server error',
    type: InternalServerError
  })
  @ApiResponse({
    status: 400,
    description: 'bad request',
    type: BadRequestError
  })
  @Post('login')
  async login(@Body() body: LoginUserDto, @Req() req: Request, @Res() res: Response) {

    const data = await this.authService.login(body, req, res)

    res.status(200).json({
      status: 200,
      success: true,
      message: 'user successfully logged in',
    })

  }

}