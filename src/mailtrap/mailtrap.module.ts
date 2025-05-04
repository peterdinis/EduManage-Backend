import { Module } from '@nestjs/common';
import { MailtrapService } from './mailtrap.service';
import { MailtrapResolver } from './mailtrap.resolver';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [MailtrapService, MailtrapResolver],
  exports: [MailtrapResolver],
})
export class MailtrapModule {}
