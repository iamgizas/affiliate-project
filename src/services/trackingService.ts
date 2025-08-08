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