import { IsString, IsOptional, IsArray, IsObject, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceProviderDto {
  @ApiProperty()
  @IsString()
  businessName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  license?: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  serviceTypes: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  experience?: string;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  certifications?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  insurance?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  backgroundCheck?: string;

  @ApiProperty()
  @IsObject()
  serviceArea: any;

  @ApiProperty()
  @IsObject()
  availability: any;

  @ApiProperty()
  @IsObject()
  pricing: any;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  specialServices?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  emergencyProcedures?: string;
} 