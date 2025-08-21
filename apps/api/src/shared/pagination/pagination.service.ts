// import { Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { CursorPaginationDto } from './pagination.dto';

// interface CursorEntity {
//   id: string;
//   createdAt: Date;
// }

// @Injectable()
// export class PaginationService {
//   async cursorPaginate<T extends CursorEntity>(
//     repo: Repository<T>,
//     paginationDto: CursorPaginationDto,
//     options: object = {},
//   ) {
//     const { limit, cursor } = paginationDto;

//     const qb = repo
//       .createQueryBuilder('entity')
//       .setFindOptions(options)
//       .orderBy('entity.createdAt', 'ASC');

//     if (cursor) {
//       const cursorEntity = await repo.findOne({
//         where: {
//           id: cursor,
//         },
//       } as any);
//       qb.where('entity.createdAt > :cursorDate', {
//         cursorDate: cursorEntity.createdAt,
//       });
//     }

//     const data = await qb.take(limit + 1).getMany();

//     const hasNextPage = data.length > limit;
//     const results = hasNextPage ? data.slice(0, limit) : data;

//     return {
//       products: results,
//       nextCursor: hasNextPage ? results[results.length - 1].id : null,
//       hasNextPage,
//     };
//   }

//   async cursorPaginateQuery<T extends CursorEntity>(
//     qb: ReturnType<Repository<T>['createQueryBuilder']>,
//     paginationDto: CursorPaginationDto,
//   ) {
//     const { limit, cursor } = paginationDto;

//     qb.orderBy('entity.createdAt', 'ASC');

//     if (cursor) {
//       const cursorEntity = await qb.connection
//         .getRepository(qb.expressionMap.mainAlias!.target)
//         .findOne({
//           where: { id: cursor },
//         } as any);

//       if (cursorEntity) {
//         qb.andWhere('entity.createdAt > :cursorDate', {
//           cursorDate: cursorEntity.createdAt,
//         });
//       }
//     }

//     const data = await qb.take(limit + 1).getMany();

//     const hasNextPage = data.length > limit;
//     const results = hasNextPage ? data.slice(0, limit) : data;

//     return {
//       products: results,
//       nextCursor: hasNextPage ? results[results.length - 1].id : null,
//       hasNextPage,
//     };
//   }
// }

import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CursorPaginationDto } from './pagination.dto';

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

    // ✅ Support QueryBuilder OR Repository
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

    const data = await qb.take(limit + 1).getMany();

    const hasNextPage = data.length > limit;
    const results = hasNextPage ? data.slice(0, limit) : data;

    return {
      products: results,
      nextCursor: hasNextPage ? results[results.length - 1].id : null,
      hasNextPage,
    };
  }
}
