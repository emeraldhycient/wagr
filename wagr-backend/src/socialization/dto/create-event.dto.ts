import { IsString, IsDate, IsEnum, IsOptional, IsArray, IsNumber, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EventType, SocializationLevel } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ enum: EventType })
  @IsEnum(EventType)
  eventType: EventType;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  startTime: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  endTime: Date;

  @ApiProperty()
  @IsObject()
  location: any;

  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  @IsNumber()
  maxAttendees?: number = 10;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allowedBreeds?: string[];

  @ApiProperty({ type: [String], enum: SocializationLevel, required: false })
  @IsOptional()
  @IsArray()
  @IsEnum(SocializationLevel, { each: true })
  allowedSocializationLevels?: SocializationLevel[];
} 