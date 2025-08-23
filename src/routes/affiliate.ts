import { Request, Response, Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createLink, listLinks, stats } from "../controllers/affiliateController";

const router = Router();

// Aplicar middleware JWT
router.use(authMiddleware)

// Rota protegida (acesso ao painel do afiliado)
router.get('/dashboard', (req, res) => {
    const user = req.user
    if (user?.role !== 'AFFILIATE') {
        return res.status(403).json({ error: 'Acesso negado.' })
    }

    res.json({ message: `Painel do afiliado ${user.userId}` })
})

// Gerar link de afiliado
router.post('/links', createLink)

// Listar links do afiliado
router.get('/links', listLinks)

// estatística do afiliado
router.get('/stats', authMiddleware, stats)

export default router