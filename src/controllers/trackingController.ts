import { Request, Response } from "express";
import { registerClick, registerSale } from "../services/trackingService";

export async function trackClick(req: Request, res: Response) {
    try {
        const { code } = req.query
        const ip = req.ip
        const userAgent = req.headers["user-agent"] || ""

        if (!code || typeof code !== "string") {
            return res.status(400).json({ error: "Código do link é obrigatório." })
        }

        const result = await registerClick(code, ip, userAgent)

        return res.json(result)
    } catch (err: any) {
        return res.status(400).json({ error: err.message })
    }
}

export async function trackSale(req: Request, res: Response) {
    try {
        const { affiliateLinkCode, amount, externalSaleId } = req.body

        if (!affiliateLinkCode || !amount || !externalSaleId) {
            return res.status(400).json({ error: "affiliateLinkCode, amount e externalSaleId são obrigatórios." })
        }

        const sale = await registerSale(affiliateLinkCode, amount, externalSaleId)

        return res.json(sale)
    } catch (err: any) {
        return res.status(400).json({ error: err.message })
    }
}