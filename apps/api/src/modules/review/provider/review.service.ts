import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateReviewDto } from '../dto/create-review.dto';
import { Repository } from 'typeorm';
import { Review } from '../model/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as SYS_MSG from '@/shared/system-message';
import { VendorExistProvider } from '@/modules/vendors/providers/vendor-exist.provider';
import { Vendor } from '@/modules/vendors/model/vendors.entity';
import { User } from '@/modules/users/model/users.entity';
import { DeleteReviewDto } from '../dto/delete-review.dto';
import { ReviewExistProvider } from '../providers/review-exist.provider';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly vendorExist: VendorExistProvider,
    private readonly reviewExistProvider: ReviewExistProvider,
  ) {}
  async createReview(addReviewDto: CreateReviewDto) {
    try {
      const vendorExist = await this.vendorExist.checkVendorExistById(
        addReviewDto.vendorId,
      );

      const review = this.reviewRepository.create({
        ...addReviewDto,
        vendor: { id: vendorExist.id } as Vendor,
        user: { id: addReviewDto.userId } as User,
      });

      await this.reviewRepository.save(review);

      return {
        data: review,
        message: SYS_MSG.REVIEW_CREATED_SUCCESSFULLY,
      };
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }

  async deleteReview(deleteReviewDto: DeleteReviewDto) {
    const review = await this.reviewExistProvider.checkReviewExist(
      deleteReviewDto.id,
    );

    try {
      await this.reviewRepository.delete({
        id: review.id,
      });

      return {
        data: review,
        message: SYS_MSG.REVIEW_DELETED_SUCCESSFULLY,
      };
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: SYS_MSG.DB_CONNECTION_ERROR,
      });
    }
  }
}
