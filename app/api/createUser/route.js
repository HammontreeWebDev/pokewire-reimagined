import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import validatePassword from "../../utils/validatePassword";

const prisma = new PrismaClient();

export async function POST(request) {
    const { email, name, password } = await request.json();

    if (!validatePassword(password)) {
        return new Response(JSON.stringify({
            error: "Password does not meet the complexity requirements."
        }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                image: ''
            },
        });

        // omit password from response
        const { password, ...userWithoutPassword } = newUser;
        return new Response(JSON.stringify(userWithoutPassword), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return new Response(JSON.stringify({
            error: "Failed to create user"
        }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}