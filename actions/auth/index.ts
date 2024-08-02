'use server'

import { z } from "zod"
import { CredentialsSchema } from "../../schemas/auth"
import { signIn } from "../../auth"
import { AuthError, CredentialsSignin } from "next-auth"

export const login = async (credentials: z.infer<typeof CredentialsSchema>) => {
    const validCredentials = await CredentialsSchema.safeParse(credentials)
    if (validCredentials.success) {
        try {
            const { username, password } = validCredentials.data
            // TODO - Validar se o usuário não está desativado pelo root

            console.log("valid data")

            console.log(credentials)

            const resp = await signIn("credentials",
                {
                    username,
                    password,
                    redirectTo: "/dashboard"
                },
            )
        } catch (error) {
            if (error instanceof AuthError){
                if (error instanceof CredentialsSignin){
                    return {
                        error: error.code
                    }
                }
            }
            return {
                error: "Algo deu errado"
            }
        }

        console.log(credentials)
    }

    return {
        error: "Dados inválidos"
    }
}