import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

function generateCode() {
  return crypto.randomBytes(4).toString("hex");
}

export async function createAffiliateLink(
  userId: string,
  ecommerceId: string,
  productUrl: string
) {
  const code = generateCode();

  const link = await prisma.affiliateLink.create({
    data: {
      code,
      productUrl,
      userId,
      ecommerceId,
    },
  });

  return link;
}

export async function getAffiliateLinks(userId: string) {
  return prisma.affiliateLink.findMany({
    where: { userId },
    include: {
      ecommerce: true,
      clicks: true,
      sales: true,
    },
  });
}
