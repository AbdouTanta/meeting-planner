/*
  Warnings:

  - You are about to drop the column `startTime` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `startHour` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reservation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startHour" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "roomId" TEXT NOT NULL,
    CONSTRAINT "Reservation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reservation" ("id", "number", "roomId", "type") SELECT "id", "number", "roomId", "type" FROM "Reservation";
DROP TABLE "Reservation";
ALTER TABLE "new_Reservation" RENAME TO "Reservation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
