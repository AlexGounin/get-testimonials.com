-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "enabled" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "image" DROP NOT NULL;
