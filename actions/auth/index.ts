'use server'

import { z } from "zod"
import { CredentialsSchema } from "../../schemas/auth"

export const login = async (credentials: z.infer<typeof CredentialsSchema>) => {
    const validData = await CredentialsSchema.safeParse(credentials)
    if (validData.success) {
        try {
            const { username, password } = validData.data
        } catch (error) {
            return {
                error: "Erro AuthJS"
            }
        }

        console.log(credentials)
    }

    return {
        error: "Dados inválidos"
    }
}