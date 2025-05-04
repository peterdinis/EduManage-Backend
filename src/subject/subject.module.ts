import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { SubjectService } from "./subject.service";
import { SubjectResolver } from "./subject.resolver";

@Module({
    imports: [PrismaModule],
    providers: [SubjectService, SubjectResolver]
})

export class SubjectModule {}