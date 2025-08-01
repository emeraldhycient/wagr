import { IsString, IsDate, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateBookingDto {
  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  startTime: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  endTime: Date;

  @ApiProperty()
  @IsString()
  dogId: string;

  @ApiProperty()
  @IsString()
  serviceProviderId: string;

  @ApiProperty()
  @IsNumber()
  totalPrice: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
} 