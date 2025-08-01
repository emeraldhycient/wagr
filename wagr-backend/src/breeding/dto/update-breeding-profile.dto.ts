import { PartialType } from '@nestjs/swagger';
import { CreateBreedingProfileDto } from './create-breeding-profile.dto';

export class UpdateBreedingProfileDto extends PartialType(CreateBreedingProfileDto) {} 