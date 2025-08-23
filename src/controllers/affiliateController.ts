import { Request, Response } from 'express';
import { createAffiliateLink, getAffiliateLinks, getAffiliateStats } from '../services/affiliateService';

export const createLink = async (req: Request, res: Response) => {
    const user = req.user
    const { productUrl, ecommerceId } = req.body

    if (!user || user.role !== 'AFFILIATE') {
        return res.status(403).json({ error: 'Acesso negado.' })
    }

    if (!productUrl || !ecommerceId) {
        return res.status(400).json({ error: 'productUrl e ecommerceId são obrigatórios.' })
    }

    try {
        const link = await createAffiliateLink(user.userId, ecommerceId, productUrl)
        return res.status(201).json({ link })
    } catch (err: any) {
        return res.status(500).json({ error: err.message })
    }
}

export const listLinks = async (req: Request, res: Response) => {
    const user = req.user

    if (!user || user.role !== 'AFFILIATE') {
        return res.status(401).json({ error: 'Acesso negado.' })
    }

    try {
        const links = await getAffiliateLinks(user.userId)
        return res.json({ links })
    } catch (err: any) {
        return res.status(500).json({ error: err.message })
    }
}

export const stats = async (req: Request, res: Response) => {
    const user = req.user

    if (!user || user.role !== 'AFFILIATE') {
        return res.status(401).json({ error: 'Acesso negado.' })
    }

    try {
        const data = await getAffiliateStats(user.userId)
        return res.json({ stats: data })
    } catch (err: any) {
        return res.status(500).json({ error: err.message })
    }
}