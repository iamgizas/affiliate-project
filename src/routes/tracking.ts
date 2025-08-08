import { Router } from 'express'
import { clickRedirect } from '../controllers/trackingController'

const router = Router()

router.get('/click/:code', clickRedirect)

export default router