import { IsEnum, IsOptional, IsBoolean, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BreedingStatus } from '@prisma/client';

export class CreateBreedingProfileDto {
  @ApiProperty({ enum: BreedingStatus, default: BreedingStatus.AVAILABLE })
  @IsEnum(BreedingStatus)
  status: BreedingStatus = BreedingStatus.AVAILABLE;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  healthScreening?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  geneticTests?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  breedingHistory?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  preferences?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isStud?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isBreedingFemale?: boolean;
} 