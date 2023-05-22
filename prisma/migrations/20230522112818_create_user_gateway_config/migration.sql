-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "config_gateway" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serialPort" TEXT NOT NULL,
    "clientApiUrl" TEXT,
    "logLevel" INTEGER NOT NULL,
    "apiKey" TEXT,
    "integration" BOOLEAN NOT NULL,
    "readQueueInterval" INTEGER NOT NULL,
    "wsConnection" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
