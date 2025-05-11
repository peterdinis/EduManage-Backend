import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { GradeService } from "./grade.service";
import { GradeResolver } from "./grade.resolver";

@Module({
    imports: [PrismaModule],
    providers: [GradeService, GradeResolver]
})

export class GradeModule {}