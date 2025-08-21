import { Body, Controller, Post } from '@nestjs/common';
import { ReviewService } from './provider/review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { CreateDoc } from '@/shared/doc-response';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @CreateDoc('Add review', CreateReviewDto)
  @Post()
  createReview(@Body() addReviewDto: CreateReviewDto) {
    return this.reviewService.createReview(addReviewDto);
  }
}
