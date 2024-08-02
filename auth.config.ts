import { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { CredentialsSchema } from "./schemas/auth";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validCredentials = await CredentialsSchema.safeParse(credentials)

                if (validCredentials.success) {
                    const { username, password } = validCredentials.data

                    // TODO Buscar no banco de dados o usuário
                    // Verificar a hashed password

                    const user = {
                        id: "1",
                        name: "Pedro",
                        username: "pehbathory",
                        email: "LkCpE@example.com",
                        role: "admin",
                    }
                    return user
                }

                return null
            }
        })
    ],
} satisfies NextAuthConfig