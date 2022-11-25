import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";

export class PostModel {
  @ApiPropertyOptional({ type: Number })
  id?: number;
  @ApiProperty({ type: Date, format: 'date' })
  date: Date;
  @ApiProperty({ type: String })
  title: string;
  @ApiProperty({ type: String })
  body: string;
  @ApiProperty({ type: String })
  category: string;
}