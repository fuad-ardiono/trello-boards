import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcrypt';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { SignupUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signup(payload: SignupUserDto): Promise<User> {
    const user: User = Object.assign(new User(), payload);
    user.created_at = new Date();
    user.updated_at = new Date();
    user.password = hashSync(payload.password, 10);

    return await this.userRepository.save(user);
  }
}
