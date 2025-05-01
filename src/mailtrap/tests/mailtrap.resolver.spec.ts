import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { SendEmailInput } from '../dto/send-email-input.dto';
import { MailtrapResolver } from '../mailtrap.resolver';
import { MailtrapService } from '../mailtrap.service';

describe('MailtrapResolver', () => {
  let resolver: MailtrapResolver;
  let service: MailtrapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailtrapResolver,
        {
          provide: MailtrapService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<MailtrapResolver>(MailtrapResolver);
    service = module.get<MailtrapService>(MailtrapService);
  });

  it('should send email successfully', async () => {
    const input: SendEmailInput = {
      to: faker.internet.email(),
      subject: faker.lorem.sentence(),
      message: faker.lorem.paragraph(),
    };

    jest.spyOn(service, 'sendMail').mockResolvedValue(true);

    const result = await resolver.sendEmail(input);
    expect(result).toBe(true);
    expect(service.sendMail).toHaveBeenCalledWith(
      input.to,
      input.subject,
      input.message
    );
  });

  it('should throw BadRequestException on failure', async () => {
    const input: SendEmailInput = {
      to: faker.internet.email(),
      subject: faker.lorem.sentence(),
      message: faker.lorem.paragraph(),
    };

    jest.spyOn(service, 'sendMail').mockResolvedValue(false);

    await expect(resolver.sendEmail(input)).rejects.toThrow(BadRequestException);
  });
});
