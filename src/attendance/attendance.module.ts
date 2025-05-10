import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { AttendanceResolver } from "./attendance.resolver";
import { AttendanceService } from "./attendance.service";

@Module({
    imports: [PrismaModule],
    providers: [AttendanceResolver, AttendanceService]
})

export class AttendanceModule {}