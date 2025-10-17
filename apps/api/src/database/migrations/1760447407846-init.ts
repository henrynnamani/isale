import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1760447407846 implements MigrationInterface {
    name = 'Init1760447407846'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "brands" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(256) NOT NULL, "deletedAt" TIMESTAMP, CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying(256), "slug" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "color" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "hex" character varying(6) NOT NULL, CONSTRAINT "PK_d15e531d60a550fbf23e1832343" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rams" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "size" integer NOT NULL, CONSTRAINT "PK_8906f35fdde990e414227c87027" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rom" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "size" integer NOT NULL, CONSTRAINT "PK_e0933e134ae4518f858ef89ace2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."product_condition_enum" AS ENUM('Brand New', 'Refurbished', 'London Used', 'Fairly Used')`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(92) NOT NULL, "available" boolean DEFAULT true, "images" text array NOT NULL, "slug" character varying, "onDiscount" boolean DEFAULT false, "trueTone" boolean DEFAULT false, "faceId" boolean DEFAULT false, "battery" integer, "condition" "public"."product_condition_enum" NOT NULL, "price" numeric NOT NULL, "stock" numeric NOT NULL DEFAULT '1', "categoryId" uuid, "brandId" uuid, "vendorId" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cartItem" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "quantity" integer NOT NULL DEFAULT '1', "cartId" uuid, "productId" uuid, CONSTRAINT "PK_56da2bf3db528f1d91566fd46e0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "REL_756f53ab9466eb52a52619ee01" UNIQUE ("userId"), CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "otp" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "token" character varying NOT NULL, "expiry" TIMESTAMP NOT NULL, "userId" uuid, CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_expiry" ON "otp" ("expiry") `);
        await queryRunner.query(`CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "review" character varying(256) NOT NULL, "rating" double precision NOT NULL, "userId" uuid, "vendorId" uuid, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "emailVerified" boolean NOT NULL DEFAULT false, "refreshToken" character varying, "phoneNumber" character varying, "password" character varying, "googleId" character varying, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderItem" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "quantity" numeric NOT NULL DEFAULT '1', "priceAtPurchase" numeric NOT NULL, "orderId" uuid, "productId" uuid, CONSTRAINT "PK_fe5c4758e5f47a681deb1065c92" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."payment_method_enum" AS ENUM('crypto', 'transfer')`);
        await queryRunner.query(`CREATE TYPE "public"."payment_status_enum" AS ENUM('paid', 'pending', 'failed')`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "reference" character varying NOT NULL, "method" "public"."payment_method_enum" NOT NULL DEFAULT 'transfer', "status" "public"."payment_status_enum" NOT NULL DEFAULT 'pending', "amount" numeric NOT NULL, "orderId" uuid, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "total_amount" numeric NOT NULL, "delivery_status" character varying NOT NULL DEFAULT 'pending', "userId" uuid, "vendorId" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."vendors_bankcode_enum" AS ENUM('0', '999991', '999992')`);
        await queryRunner.query(`CREATE TABLE "vendors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(256) NOT NULL, "slug" character varying, "subaccount" character varying, "accountNumber" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "logoImageUrl" character varying, "telegramChatId" integer NOT NULL, "bankCode" "public"."vendors_bankcode_enum" NOT NULL DEFAULT '0', "isVerified" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_7188425e2c26bcd0516fbbcd1be" UNIQUE ("slug"), CONSTRAINT "PK_9c956c9797edfae5c6ddacc4e6e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_colors_color" ("productId" uuid NOT NULL, "colorId" uuid NOT NULL, CONSTRAINT "PK_e0f1b1202fef01dce9c58f5f23b" PRIMARY KEY ("productId", "colorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_11df73505d065b93f4080cadb6" ON "product_colors_color" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8b8ba9cf68f6cb0ed6282a5c10" ON "product_colors_color" ("colorId") `);
        await queryRunner.query(`CREATE TABLE "product_rams_rams" ("productId" uuid NOT NULL, "ramsId" uuid NOT NULL, CONSTRAINT "PK_4430d7483b3271798f3ab342bb5" PRIMARY KEY ("productId", "ramsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a40f2e82c8630aa0468ae467f2" ON "product_rams_rams" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a4ce376e2f88f105c5b086a81b" ON "product_rams_rams" ("ramsId") `);
        await queryRunner.query(`CREATE TABLE "product_roms_rom" ("productId" uuid NOT NULL, "romId" uuid NOT NULL, CONSTRAINT "PK_2807a95fd9021187cbf4cb6bf4d" PRIMARY KEY ("productId", "romId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ceae5e3162047c4b7914f8e66a" ON "product_roms_rom" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2a8dcbaaef5b5fff7bf8534907" ON "product_roms_rom" ("romId") `);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_921582066aa70b502e78ea92012" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cartItem" ADD CONSTRAINT "FK_758a7aa44831ea2e513bb435acd" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cartItem" ADD CONSTRAINT "FK_970aa2911d6d32f287df098efef" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "otp" ADD CONSTRAINT "FK_db724db1bc3d94ad5ba38518433" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_ce7f611cdec825d9207c9605987" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderItem" ADD CONSTRAINT "FK_ef8ed42ef2c6feafd1447d96279" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderItem" ADD CONSTRAINT "FK_aa1c5296e561dbd599ed0f0e860" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_d09d285fe1645cd2f0db811e293" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_ac1293b8024ff05e963d82df453" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_colors_color" ADD CONSTRAINT "FK_11df73505d065b93f4080cadb60" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_colors_color" ADD CONSTRAINT "FK_8b8ba9cf68f6cb0ed6282a5c101" FOREIGN KEY ("colorId") REFERENCES "color"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_rams_rams" ADD CONSTRAINT "FK_a40f2e82c8630aa0468ae467f2c" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_rams_rams" ADD CONSTRAINT "FK_a4ce376e2f88f105c5b086a81bc" FOREIGN KEY ("ramsId") REFERENCES "rams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_roms_rom" ADD CONSTRAINT "FK_ceae5e3162047c4b7914f8e66a6" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_roms_rom" ADD CONSTRAINT "FK_2a8dcbaaef5b5fff7bf85349071" FOREIGN KEY ("romId") REFERENCES "rom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_roms_rom" DROP CONSTRAINT "FK_2a8dcbaaef5b5fff7bf85349071"`);
        await queryRunner.query(`ALTER TABLE "product_roms_rom" DROP CONSTRAINT "FK_ceae5e3162047c4b7914f8e66a6"`);
        await queryRunner.query(`ALTER TABLE "product_rams_rams" DROP CONSTRAINT "FK_a4ce376e2f88f105c5b086a81bc"`);
        await queryRunner.query(`ALTER TABLE "product_rams_rams" DROP CONSTRAINT "FK_a40f2e82c8630aa0468ae467f2c"`);
        await queryRunner.query(`ALTER TABLE "product_colors_color" DROP CONSTRAINT "FK_8b8ba9cf68f6cb0ed6282a5c101"`);
        await queryRunner.query(`ALTER TABLE "product_colors_color" DROP CONSTRAINT "FK_11df73505d065b93f4080cadb60"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_ac1293b8024ff05e963d82df453"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_d09d285fe1645cd2f0db811e293"`);
        await queryRunner.query(`ALTER TABLE "orderItem" DROP CONSTRAINT "FK_aa1c5296e561dbd599ed0f0e860"`);
        await queryRunner.query(`ALTER TABLE "orderItem" DROP CONSTRAINT "FK_ef8ed42ef2c6feafd1447d96279"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_ce7f611cdec825d9207c9605987"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"`);
        await queryRunner.query(`ALTER TABLE "otp" DROP CONSTRAINT "FK_db724db1bc3d94ad5ba38518433"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`ALTER TABLE "cartItem" DROP CONSTRAINT "FK_970aa2911d6d32f287df098efef"`);
        await queryRunner.query(`ALTER TABLE "cartItem" DROP CONSTRAINT "FK_758a7aa44831ea2e513bb435acd"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_921582066aa70b502e78ea92012"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2a8dcbaaef5b5fff7bf8534907"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ceae5e3162047c4b7914f8e66a"`);
        await queryRunner.query(`DROP TABLE "product_roms_rom"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a4ce376e2f88f105c5b086a81b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a40f2e82c8630aa0468ae467f2"`);
        await queryRunner.query(`DROP TABLE "product_rams_rams"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8b8ba9cf68f6cb0ed6282a5c10"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_11df73505d065b93f4080cadb6"`);
        await queryRunner.query(`DROP TABLE "product_colors_color"`);
        await queryRunner.query(`DROP TABLE "vendors"`);
        await queryRunner.query(`DROP TYPE "public"."vendors_bankcode_enum"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TYPE "public"."payment_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."payment_method_enum"`);
        await queryRunner.query(`DROP TABLE "orderItem"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP INDEX "public"."idx_expiry"`);
        await queryRunner.query(`DROP TABLE "otp"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "cartItem"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TYPE "public"."product_condition_enum"`);
        await queryRunner.query(`DROP TABLE "rom"`);
        await queryRunner.query(`DROP TABLE "rams"`);
        await queryRunner.query(`DROP TABLE "color"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "brands"`);
    }

}
