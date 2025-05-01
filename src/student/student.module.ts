import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { StudentResolver } from "./student.resolver";
import { StudentService } from "./student.service";
import { MailtrapModule } from "src/mailtrap/mailtrap.module";

@Module({
    imports: [PrismaModule, MailtrapModule],
    providers: [StudentResolver, StudentService]
})

export class StudentModule {}