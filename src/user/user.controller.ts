import { Controller, UseGuards, UseInterceptors, ClassSerializerInterceptor, Get, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { BadRequestError, InternalServerError, UnAuthorizedError, UnprocessableEntityError } from 'src/docs/errors.response';
import { RequestWithUser } from 'src/auth/interface/request-with-user.interface';
import { UserInformationResponse } from './docs/success-user.response';

/**
 * Swagger tag for categories this controller
 */
@ApiTags('User')
/**
 * for serialization response  
 */
@UseInterceptors(ClassSerializerInterceptor)
/**
 * check is user valid or not to access this controller
*/
@UseGuards(AuthGuard)
/**
 * User Controller
 * 
 * this class is used to redirect user routes to specific method
 * 
 * all routes that start with 'api/v1/user' enter into this controller
 */
@Controller('api/v1/user')
export class UserController {


  // ============= USER_INFO =============

  /**
   * get user information
  */
  @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
  @ApiOperation({ summary: 'get user information' })
  @ApiResponse({
    status: 200,
    description: 'success response',
    type: UserInformationResponse
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
  @Get('info')
  async userInfo(@Req() req: RequestWithUser, @Res() res: Response) {

    const { user } = req

    res.status(200).json({
      status: 200,
      success: true,
      message: 'user information successfully taken',
      data: {
        fullname: user.fullname,
        email: user.email
      }
    })

  }

}
