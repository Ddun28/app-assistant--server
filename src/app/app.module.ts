import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';
import { SectionModule } from './section/section.module';
import { SubjectModule } from './subjects/subject.module';
import { SchedulesModule } from './schedules/schedules.module';
import { assistanceModule } from './assistances/assistances.module';
import { JwtStrategy } from './users/auth/jwt.strategy';

@Module({
  imports: [
    HealthModule,
    UsersModule,
    SectionModule,
    SubjectModule,
    SchedulesModule,
    assistanceModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy]
})
export class AppModule {}
