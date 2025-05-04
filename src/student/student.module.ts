import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'supersecret'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [StudentService, StudentResolver, PrismaService, JwtStrategy],
})
export class StudentModule {}
