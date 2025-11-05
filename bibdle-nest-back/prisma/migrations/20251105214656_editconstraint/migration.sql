/*
  Warnings:

  - A unique constraint covering the columns `[date,mode]` on the table `DailyCharacter` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "DailyCharacter_date_key";

-- CreateIndex
CREATE UNIQUE INDEX "DailyCharacter_date_mode_key" ON "DailyCharacter"("date", "mode");
