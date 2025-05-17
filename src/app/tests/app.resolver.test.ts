import { AppResolver } from '../app.resolver';

describe('AppResolver', () => {
  let resolver: AppResolver;

  beforeEach(() => {
    resolver = new AppResolver();
  });

  it('should return "Hello Edu Manage!"', () => {
    expect(resolver.hello()).toBe('Hello Edu Manage!');
  });
});
