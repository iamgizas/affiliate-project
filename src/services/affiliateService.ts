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

// Estatísticas do afiliado
export async function getAffiliateStats(userId: string) {
  // Total de links do afiliado
  const links = await prisma.affiliateLink.findMany({
    where: { userId },
    include: {
      clicks: true,
      sales: true,
    },
  });

  // Soma de cliques
  const totalClicks = links.reduce((acc, link) => acc + link.clicks.length, 0);

  // Soma vendas e comissão
  const totalSales = links.reduce(( acc, link ) => acc + link.sales.length, 0);

  const commissionRate = 0.1;
  const totalCommission = links.reduce(
    (acc, link) => acc + link.sales.reduce((sAcc, sale) => sAcc + (sale.amount * commissionRate), 0),
    0
  );

  // Últimas 5 vendas
  const recentSales = await prisma.sale.findMany({
    where: {
      affiliateLink: {
        userId,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
    include: {
      affiliateLink: true,
    },
  });

  return {
    totalClicks,
    totalSales,
    totalCommission,
    recentSales,
  };
}
