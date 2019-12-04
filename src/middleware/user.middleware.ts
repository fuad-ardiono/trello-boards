import { Injectable, NestMiddleware } from '@nestjs/common';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly userServices: UserService) {}

  async use(req: any, res: any, next: () => void) {
    const headers = req.headers;
    if (headers.authorization) {
      const user: User = await this.userServices.decodeUser(headers.authorization);

      if (user) {
        req['user'] = user;
        next();
      } else {
        res.statusCode = 403;
        res.json({
          code: 'UNAUTHORIZED',
        });
      }
    } else {
      res.statusCode = 403;
      res.json({
        code: 'UNAUTHORIZED',
      });
    }
  }
}
