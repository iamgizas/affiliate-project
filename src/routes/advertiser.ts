import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middlewares/authMiddleware";
import { Request, Response, Router } from "express";
import crypto from 'crypto'

const prisma = new PrismaClient()
const router = Router()

router.use(authMiddleware)

// Criar um e-commerce (teste temp)
router.post('/ecommerce', async(req: Request, res: Response) => {
    if (req.user?.role !== 'ADVERTISER') {
        return res.status(403).json({ error: 'Apenas anunciantes podem criar e-commerces.' })
    }

    const { name, domain } = req.body

    if (!name || !domain ) {
        return res.status(400).json({ error: 'name e domain são obrigatórios.' })
    }

    try {
        const ecommerce = await prisma.ecommerce.create({
            data: {
                name,
                domain,
                apiKey: crypto.randomUUID(),
                ownerId: req.user.userId,
            }
        })

        return res.status(201).json({ ecommerce })
    } catch (err: any) {
        return res.status(500).json({ error: err.message })
    }
})

// Lista todos os ecommerces do anunciante autenticado.
router.get('/ecommerce', async (req: Request, res: Response) => {
    if (req.user?.role !== 'ADVERTISER') {
        return res.status(403).json({ error: 'Acesso negado' })
    }

    try {
        const ecommerces = await prisma.ecommerce.findMany({
            where: { ownerId: req.user.userId }
        })

        return res.json({ ecommerces })
    } catch (err: any) {
        return res.status(500).json({ error: err.message })
    }
})

export default router