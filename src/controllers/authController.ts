import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/authService";
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body
        const user = await registerUser({ name, email, password, role })

        const token = await generateToken({ userId: user.id, role: user.role })

        return res.status(201).json({ user: { id: user.id, name: user.name, role: user.role }, token })
    } catch (err: any) {
        return res.status(400).json({ error: err.message })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await loginUser(email, password)

        const token = generateToken({ userId: user.id, role: user.role })

        return res.json({ user: { id: user.id, name: user.name, role: user.role }, token })
    } catch (err: any) {
        return res.status(401).json({ error: err.message })
    }
}