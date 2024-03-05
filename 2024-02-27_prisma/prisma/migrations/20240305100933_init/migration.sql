-- CreateTable
CREATE TABLE "SpielKarte" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "angriffsPunkte" INTEGER NOT NULL,
    "lebensPunkte" INTEGER NOT NULL,
    "bildUrl" TEXT NOT NULL,
    CONSTRAINT "SpielKarte_id_fkey" FOREIGN KEY ("id") REFERENCES "KartenTyp" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "KartenTyp" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "schwaeche" TEXT NOT NULL,
    "bildUrl" TEXT NOT NULL,
    "farbe" TEXT NOT NULL
);
