/*
  Warnings:

  - You are about to drop the column `updated` on the `Poll` table. All the data in the column will be lost.
  - Added the required column `modified` to the `Poll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Poll" DROP COLUMN "updated",
ADD COLUMN     "modified" TIMESTAMP(3) NOT NULL;
