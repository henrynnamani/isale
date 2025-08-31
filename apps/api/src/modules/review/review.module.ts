import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './provider/review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './model/review.entity';
import { VendorsModule } from '../vendors/vendors.module';
import { ReviewExistProvider } from './providers/review-exist.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), VendorsModule],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewExistProvider],
})
export class ReviewModule {}
