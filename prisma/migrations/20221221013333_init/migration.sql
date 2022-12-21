-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "time" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "roomId" TEXT NOT NULL,
    CONSTRAINT "Reservation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Equipment" (
    "name" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "_EquipmentToRoom" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_EquipmentToRoom_A_fkey" FOREIGN KEY ("A") REFERENCES "Equipment" ("name") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EquipmentToRoom_B_fkey" FOREIGN KEY ("B") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_EquipmentToRoom_AB_unique" ON "_EquipmentToRoom"("A", "B");

-- CreateIndex
CREATE INDEX "_EquipmentToRoom_B_index" ON "_EquipmentToRoom"("B");
