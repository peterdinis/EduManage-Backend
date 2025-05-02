import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { MailtrapService } from './mailtrap.service';
import { BadRequestException } from '@nestjs/common';
import { SendEmailInput } from './dto/send-email-input.dto';

@Resolver()
export class MailtrapResolver {
  constructor(private readonly mailtrapService: MailtrapService) {}

  @Mutation(() => Boolean)
  async sendEmail(@Args('input') input: SendEmailInput): Promise<boolean> {
    const success = await this.mailtrapService.sendMail(
      input.to,
      input.subject,
      input.message,
    );

    if (!success) {
      throw new BadRequestException('Failed to send email.');
    }

    return true;
  }
}
