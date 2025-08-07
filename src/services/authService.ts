import { PrismaClient} from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()
type Role = typeof prisma.user.$raw.Role

export async function registerUser(data: {
    name: string
    email: string
    password: string
    role: Role
}) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } })
    if (existing) throw new Error('E-mail já registrado.')

    const passwordHash = await bcrypt.hash(data.password, 10)

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            passwordHash,
            role: data.role
        }
    })

    return user
}

export async function loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) throw new Error('Crendenciais inválidas.')
    
    const isValid = await bcrypt.compare(password, user.passwordHash)
    if (!isValid) throw new Error('Credencais inválidas.')

    return user
}