import { Injectable } from '@nestjs/common';
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { CursorPaginationDto, PaginationDto } from './pagination.dto';
import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

interface CursorEntity {
  id: string;
  createdAt: Date;
}

@Injectable()
export class PaginationService {
  async cursorPaginate<T extends CursorEntity>(
    source: Repository<T> | SelectQueryBuilder<T>,
    paginationDto: CursorPaginationDto,
  ) {
    const { limit, cursor } = paginationDto;

    const qb =
      source instanceof Repository
        ? source.createQueryBuilder('entity').orderBy('entity.createdAt', 'ASC')
        : source;

    if (cursor) {
      let cursorEntity: T | null = null;

      if (source instanceof Repository) {
        cursorEntity = await source.findOne({ where: { id: cursor } } as any);
      } else {
        cursorEntity = await source.connection
          .getRepository<T>(qb.alias as any)
          .findOne({ where: { id: cursor } } as any);
      }

      if (cursorEntity) {
        qb.andWhere(`${qb.alias}.createdAt > :cursorDate`, {
          cursorDate: cursorEntity.createdAt,
        });
      }
    }

    const data = !(source instanceof SelectQueryBuilder)
      ? await qb.take(limit + 1).getMany()
      : await (source as SelectQueryBuilder<T>).getMany();

    const hasNextPage = data.length > limit;
    const results = hasNextPage ? data.slice(0, limit) : data;

    return {
      products: results,
      nextCursor: hasNextPage ? results[results.length - 1].id : null,
      hasNextPage,
    };
  }

  async paginateQuery<T extends ObjectLiteral>(
    source: Repository<T> | SelectQueryBuilder<T>,
    paginationDto: PaginationDto,
  ) {
    console.log(paginationDto);
    const { page, limit } = paginationDto;

    console.log(limit);
    const skip = (page - 1) * limit;

    const qb =
      source instanceof Repository
        ? source.createQueryBuilder('entity').orderBy('entity.createdAt', 'ASC')
        : source;

    const [data, totalItems] = await qb
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    console.log(qb.getSql());

    const totalPages = Math.ceil(totalItems / limit);
    const nextPage = page < totalPages ? page + 1 : null;

    return {
      data,
      meta: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems,
        totalPages,
        nextPage,
      },
    };
  }
}
