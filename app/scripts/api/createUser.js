import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import validatePassword from "../utils/validatePassword";

const prisma = new PrismaClient();

export default async function createUser(req, res) {
    const { email, name, password } = req.body;

    if (!validatePassword(password)) {
        return res.status(400).json({
            error: "Password does not meet the complexity requirements."
        });
    };

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
        });

        // omit password from response
        const { password, ...userWithoutPassword } = newUser;
        res.status(200).json(userWithoutPassword);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            error: "Failed to create user"
        });
    };
}