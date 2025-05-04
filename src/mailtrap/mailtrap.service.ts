import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailtrapService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAILTRAP_HOST'),
      port: this.configService.get<number>('MAILTRAP_PORT'),
      auth: {
        user: this.configService.get<string>('MAILTRAP_USERNAME'),
        pass: this.configService.get<string>('MAILTRAP_PASSWORD'),
      },
    });
  }

  async sendMail(to: string, subject: string, message: string): Promise<boolean> {
    const info = await this.transporter.sendMail({
      from: '"My App" <noreply@myapp.com>',
      to,
      subject,
      text: message,
    });

    return info.accepted.length > 0;
  }
}
