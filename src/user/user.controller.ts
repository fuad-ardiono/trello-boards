import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SigninUserDto, SignupUserDto } from './user.dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/signup')
  async signup(@Body() request: SignupUserDto): Promise<any> {
    try {
      const response: User = await this.userService.signup(request);

      return response;
    } catch (err) {
      const errTrace = {
        message: err.message || '',
        code: err.code || 'INTERNAL_SERVER_ERROR',
      };

      throw new HttpException(errTrace, HttpStatus.BAD_REQUEST);
    }
  }
}
