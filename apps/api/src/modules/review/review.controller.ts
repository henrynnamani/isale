import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ReviewService } from './provider/review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { CreateDoc, CreateGetDoc } from '@/shared/doc-response';
import { ApiTags } from '@nestjs/swagger';
import { DeleteReviewDto } from './dto/delete-review.dto';

@ApiTags('review')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @CreateDoc('Add review', CreateReviewDto)
  createReview(@Body() addReviewDto: CreateReviewDto) {
    return this.reviewService.createReview(addReviewDto);
  }

  @Delete(':id')
  @CreateGetDoc('Delete review', DeleteReviewDto)
  deleteReview(@Param() deleteReviewDto: DeleteReviewDto) {
    return this.reviewService.deleteReview(deleteReviewDto);
  }
}
