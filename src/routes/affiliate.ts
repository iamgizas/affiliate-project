import { Request, Response, Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Aplicar middleware JWT
router.use(authMiddleware)

// Rota protegida (acesso ao painel do afiliado)
router.get('/dashboard', (req: Request, res: Response) => {
    const { user } = req

    if (user?.role !== 'AFFILIATE') {
        return res.status(403).json({ error: 'Acesso permitido apenas para afiliados.' })
    }

    return res.json({
        message: `Boas-vindas ao seu painel de afiliado ${user.userId}`,
    })
})

export default router