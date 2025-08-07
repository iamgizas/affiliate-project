import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'

// Rotas
import authRoutes from './routes/auth'
import affiliateRoutes from './routes/affiliate'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/auth', authRoutes)
app.use('/affiliate', affiliateRoutes)

app.get('/', (req, res) => {
    res.send('Affiliate Plataform API 🚀')
})

const PORT = process.env.PORT || 7777
app.listen(PORT, () => {
    console.log(`🚀 API rodando na porta ${PORT}`)
})