import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { AssigmentResolver } from "./assigment.resolver";
import { AssigmentService } from "./assigment.service";

@Module({
    imports: [PrismaModule],
    providers: [AssigmentResolver, AssigmentService]
})

export class AssigmentModule {}