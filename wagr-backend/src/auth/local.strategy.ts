import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
    this.logger.log('Local Strategy initialized successfully');
  }

  async validate(email: string, password: string): Promise<any> {
    try {
      const user = await this.authService.validateUserByCredentials(email, password);
      if (!user) {
        this.logger.warn(`Failed login attempt for email: ${email}`);
        throw new UnauthorizedException('Invalid credentials');
      }
      this.logger.log(`Successful login for user: ${user.email}`);
      return user;
    } catch (error) {
      this.logger.error('Local strategy validation failed:', error);
      throw new UnauthorizedException('Invalid credentials');
    }
  }
} 