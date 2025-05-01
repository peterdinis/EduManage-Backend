import { Module } from "@nestjs/common";
import { MailtrapService } from "./mailtrap.service";
import { MailtrapResolver } from "./mailtrap.resolver";

@Module({
    providers: [MailtrapService, MailtrapResolver],
    exports: [MailtrapResolver]
})

export class MailtrapModule {}