/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Recordings` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[key]` on the table `Recordings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Recordings_id_key" ON "Recordings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Recordings_key_key" ON "Recordings"("key");
