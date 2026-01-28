/*
  Warnings:

  - A unique constraint covering the columns `[date,id]` on the table `Rooms` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Rooms_date_id_key" ON "Rooms"("date", "id");
