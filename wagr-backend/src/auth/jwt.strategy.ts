import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    
    if (!jwtSecret) {
      throw new Error('JWT_SECRET environment variable is required. Please set it in your .env file.');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });

    this.logger.log('JWT Strategy initialized successfully');
  }

  async validate(payload: any) {
    try {
      const user = await this.authService.validateUser(payload.userId);
      if (!user) {
        this.logger.warn(`Invalid JWT token: user not found for userId ${payload.userId}`);
        throw new UnauthorizedException('Invalid token');
      }
      return user;
    } catch (error) {
      this.logger.error('JWT validation failed:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
} 