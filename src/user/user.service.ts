import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync, hashSync } from 'bcrypt';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RedisService } from 'nestjs-redis';
import { SigninResponseDto, SigninUserDto, SignupUserDto } from './user.dto';
import * as jwt from 'jsonwebtoken';

const SECRET = '63f9165a-3084-4eee-ac24-ced7c81145d4';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly redisService: RedisService,
  ) {}

  async decodeUser(token: string): Promise<User> | null {
    const decoded = jwt.decode(token);
    const redisClient = await this.redisService.getClient();
    const rawData = await redisClient.get(`session_${decoded['email']}`);
    if (rawData) {
      const user = JSON.parse(rawData);
      return user;
    } else {
      return null;
    }
  }

  async signup(payload: SignupUserDto): Promise<User> {
    const user: User = Object.assign(new User(), payload);
    user.password = hashSync(payload.password, 10);
    user.imageUrl = user.imageUrl === '' ? null : user.imageUrl;
    user.created_at = new Date();
    user.updated_at = new Date();

    const newUser = await this.userRepository.save(user);
    const userRecord = await this.userRepository.findOne({ id: newUser.id });
    return userRecord;
  }

  async signin(payload: SigninUserDto): Promise<SigninResponseDto> {
    const user: User = await this.userRepository.findOne({
      where: [
        {
          email: payload.email,
        },
        {
          displayName: payload.displayName,
        },
      ],
    });

    if (user) {
      const passwordMatch: boolean = compareSync(payload.password, user.password);

      if (passwordMatch) {
        const token = jwt.sign({ email: user.email }, SECRET);
        const response = new SigninResponseDto();
        response.token = token;
        response.user = user;

        const redisClient = await this.redisService.getClient();
        const cloneUser = Object.assign({}, user);
        delete cloneUser.password;
        redisClient.set(`session_${user.email}`, JSON.stringify(cloneUser));

        return response;
      }

      throw {
        message: 'invalid email / displayName / password combination',
        code: 'INVALID_LOGIN',
      };
    } else {
      throw {
        message: 'invalid email / displayName / password combination',
        code: 'INVALID_LOGIN',
      };
    }
  }
}
