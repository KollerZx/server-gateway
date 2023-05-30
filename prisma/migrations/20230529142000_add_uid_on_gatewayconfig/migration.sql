-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_config_gateway" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL DEFAULT 'Gateway',
    "uid" TEXT NOT NULL DEFAULT '',
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
INSERT INTO "new_config_gateway" ("apiKey", "clientApiUrl", "createdAt", "description", "id", "integration", "logLevel", "readQueueInterval", "serialPort", "updatedAt", "wsConnection") SELECT "apiKey", "clientApiUrl", "createdAt", "description", "id", "integration", "logLevel", "readQueueInterval", "serialPort", "updatedAt", "wsConnection" FROM "config_gateway";
DROP TABLE "config_gateway";
ALTER TABLE "new_config_gateway" RENAME TO "config_gateway";
CREATE UNIQUE INDEX "config_gateway_uid_key" ON "config_gateway"("uid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
