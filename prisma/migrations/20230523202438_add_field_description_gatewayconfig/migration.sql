-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_config_gateway" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL DEFAULT 'Gateway',
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
INSERT INTO "new_config_gateway" ("apiKey", "clientApiUrl", "createdAt", "id", "integration", "logLevel", "readQueueInterval", "serialPort", "updatedAt", "wsConnection") SELECT "apiKey", "clientApiUrl", "createdAt", "id", "integration", "logLevel", "readQueueInterval", "serialPort", "updatedAt", "wsConnection" FROM "config_gateway";
DROP TABLE "config_gateway";
ALTER TABLE "new_config_gateway" RENAME TO "config_gateway";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
