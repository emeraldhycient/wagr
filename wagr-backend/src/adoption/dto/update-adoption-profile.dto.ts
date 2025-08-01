import { PartialType } from '@nestjs/swagger';
import { CreateAdoptionProfileDto } from './create-adoption-profile.dto';

export class UpdateAdoptionProfileDto extends PartialType(CreateAdoptionProfileDto) {} 