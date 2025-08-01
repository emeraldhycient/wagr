import { IsString, IsDate, IsEnum, IsOptional, IsArray, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender, SocializationLevel } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateDogDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  breed: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  birthDate: Date;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  medicalConditions?: string[];

  @ApiProperty()
  @IsString()
  furType: string;

  @ApiProperty()
  @IsString()
  furColor: string;

  @ApiProperty({ enum: SocializationLevel, default: SocializationLevel.BEGINNER })
  @IsEnum(SocializationLevel)
  socializationLevel: SocializationLevel = SocializationLevel.BEGINNER;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  photos?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isAvailableForBreeding?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isForAdoption?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  height?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
} 