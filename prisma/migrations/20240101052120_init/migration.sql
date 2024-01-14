-- CreateEnum
CREATE TYPE "Friend_Status" AS ENUM ('PENDING', 'ESTABLISHED');

-- CreateTable
CREATE TABLE "Friends" (
    "user1Id" TEXT NOT NULL,
    "user2Id" TEXT NOT NULL,
    "status" "Friend_Status" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Friends_user1Id_user2Id_key" ON "Friends"("user1Id", "user2Id");

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
