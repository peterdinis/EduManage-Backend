import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { TeacherResolver } from "./teacher.resolver";
import { TeacherService } from "./teacher.service";

@Module({
    imports: [PrismaModule],
    providers: [TeacherResolver, TeacherService]
})

export class TeacherModule {}