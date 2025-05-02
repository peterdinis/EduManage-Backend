import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailtrapService {
  private transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  async sendMail(
    to: string,
    subject: string,
    message: string,
  ): Promise<boolean> {
    const info = await this.transporter.sendMail({
      from: '"My App" <noreply@myapp.com>',
      to,
      subject,
      text: message,
    });

    return info.accepted.length > 0;
  }
}
