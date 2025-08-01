import { IsEnum, IsOptional, IsString, IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AdoptionStatus } from '@prisma/client';

export class CreateAdoptionProfileDto {
  @ApiProperty({ enum: AdoptionStatus, default: AdoptionStatus.AVAILABLE })
  @IsEnum(AdoptionStatus)
  status: AdoptionStatus = AdoptionStatus.AVAILABLE;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  story?: string;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  specialNeeds?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  adoptionFee?: number;
} 