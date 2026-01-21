-- DropForeignKey
ALTER TABLE "Rooms" DROP CONSTRAINT "Rooms_guestid_fkey";

-- AlterTable
ALTER TABLE "Rooms" ALTER COLUMN "guestid" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_guestid_fkey" FOREIGN KEY ("guestid") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
