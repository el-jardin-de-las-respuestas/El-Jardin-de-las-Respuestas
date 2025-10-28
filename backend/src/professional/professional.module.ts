import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ProfessionalController } from './professional.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ProfessionalController],
  providers: [ProfessionalService],
})
export class ProfessionalModule {}
