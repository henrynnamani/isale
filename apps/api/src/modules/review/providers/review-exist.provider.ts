import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { Review } from '../model/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as SYS_MSG from '@/shared/system-message';

@Injectable()
export class ReviewExistProvider {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async checkReviewExist(id: string) {
    try {
      const review = await this.reviewRepository.findOneByOrFail({
        id,
      });

      if (!review) {
        throw new NotFoundException(SYS_MSG.REVIEW_DOES_NOT_EXIST);
      }

      return review;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }
}
