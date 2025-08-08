import { Request, Response } from 'express';
import { registerClick } from '../services/trackingService';

export async function clickRedirect(req: Request, res: Response) {
    const { code } = req.params
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || ''
    const userAgent = req.headers['user-agent'] || ''

    try {
        const { redirectUrl } = await registerClick(code, String(ip), String(userAgent))
        // Redireciona para o URL do produto
        return res.redirect(redirectUrl)
    } catch (error: any) {
        return res.status(404).json({ error: error.message })
    }
}