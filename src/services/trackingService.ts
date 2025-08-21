import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function registerClick(code: string, ip: string, userAgent: string) {
    // Busca o link do afiliado via código
    const link = await prisma.affiliateLink.findUnique({
        where: { code },
        include: {
            user: true,
            ecommerce: true,
        }   
    })

    if (!link) {
        throw new Error('Link de afiliado inválido.')
    }

    // Registra o clique
    const click = await prisma.click.create({
        data: {
            affiliateLinkId: link.id,
            ecommerceId: link.ecommerceId,
            userId: link.userId,
            ipAddress: ip,
            userAgent,
            clickedAt: new Date(),
        }
    })

    return { click, redirectUrl: link.productUrl }
}

// Registra vendas
export async function registerSale(code: string, amount: number, orderId: string) {
    const link = await prisma.affiliateLink.findUnique({
        where: { code },
        include: {
            user: true,
            ecommerce: true,
        }
    })

    if (!link) {
        throw new Error('Link de afiliado inválido.')
    }

    // Calcula comissão
    const commissionRate = 0.1
    const commission = amount * commissionRate

    // Registra venda
    const sale = await prisma.sale.create({
        data: {
            affiliateLinkId: link.id,
            ecommerceId: link.ecommerceId,
            userId: link.userId,
            orderId,
            amount,
            commission,
            status: "PENDING",
            createdAt: new Date(),
        }
    })

    return { sale, commission }
}