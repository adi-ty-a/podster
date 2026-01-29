/*
  Warnings:

  - The primary key for the `Recordings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Rooms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `status` to the `Recordings` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RecordingStatus" AS ENUM ('PENDING', 'UPLOADING', 'READY', 'FAILED');

-- DropForeignKey
ALTER TABLE "Recordings" DROP CONSTRAINT "Recordings_roomId_fkey";

-- AlterTable
ALTER TABLE "Recordings" DROP CONSTRAINT "Recordings_pkey",
ADD COLUMN     "status" "RecordingStatus" NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "roomId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Recordings_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Recordings_id_seq";

-- AlterTable
ALTER TABLE "Rooms" DROP CONSTRAINT "Rooms_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Rooms_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Rooms_id_seq";

-- AddForeignKey
ALTER TABLE "Recordings" ADD CONSTRAINT "Recordings_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
