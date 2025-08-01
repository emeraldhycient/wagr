import { IsOptional, IsString, IsArray, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  media?: string[];

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  hashtags?: string[];

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean = true;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  dogId?: string;
} 