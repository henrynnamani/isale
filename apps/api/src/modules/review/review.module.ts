import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './provider/review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './model/review.entity';
import { VendorsModule } from '../vendors/vendors.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), VendorsModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
