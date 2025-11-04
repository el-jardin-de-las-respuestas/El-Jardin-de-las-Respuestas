/*
  Warnings:

  - Added the required column `content` to the `Library` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Library" ADD COLUMN     "content" TEXT NOT NULL;
