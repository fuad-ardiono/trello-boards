import { UserMiddleware } from './user.middleware';

describe('UserMiddleware', () => {
  it('should be defined', () => {
    // @ts-ignore
    expect(new UserMiddleware()).toBeDefined();
  });
});
