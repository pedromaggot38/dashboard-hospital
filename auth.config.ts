import { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { CredentialsSchema } from "./schemas/auth";

export default {
    providers: [
        Credentials({
            credentials: {
                username: {},
                password: {},
            },

            async authorize(credentials) {
                const validCredentials = await CredentialsSchema.safeParse(credentials)

                if (validCredentials.success) {
                    const { username, password } = validCredentials.data
                    // TODO Buscar no banco de dados o usuário
                    // TODO Verificar a hashed password
                    // TODO Validar se o usuário não está desativado pelo root


                }

                return null
            }
        })
    ],
} satisfies NextAuthConfig