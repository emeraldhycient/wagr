import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export class UpdateBookingStatusDto {
  @ApiProperty({
    enum: BookingStatus,
    description: 'The new status for the booking',
  })
  @IsEnum(BookingStatus)
  status: BookingStatus;
} 