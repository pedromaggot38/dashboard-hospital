import { z } from 'zod';

const usernameRegex = /^[a-zA-Z0-9]+$/;

const PASSWORD_MIN_LENGTH = 4;
const NAME_MIN_LENGTH = 4;
const NAME_ERROR_MESSAGE = `O nome deve ter no mínimo ${NAME_MIN_LENGTH} caracteres`;
const PASSWORD_ERROR_MESSAGE = `A senha deve ter no mínimo ${PASSWORD_MIN_LENGTH} caracteres`;

// Schema base para senhas, para ser reutilizado
const passwordSchemaShape = {
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, { message: PASSWORD_ERROR_MESSAGE }),
  passwordConfirm: z
    .string()
    .min(PASSWORD_MIN_LENGTH, { message: PASSWORD_ERROR_MESSAGE }),
};

const userProfileSchema = z.object({
  name: z
    .string()
    .min(NAME_MIN_LENGTH, { message: NAME_ERROR_MESSAGE })
    .optional(),
  // CORRIGIDO: Sintaxe moderna para email opcional
  email: z.string().email({ message: 'Email inválido' }).optional(),
  // CORRIGIDO: Lógica simplificada para telefone opcional
  phone: z
    .string()
    .refine((val) => val === '' || /^\d{1,11}$/.test(val), {
      message: 'O telefone deve conter apenas números e no máximo 11 dígitos',
    })
    .optional(),
  // CORRIGIDO: Sintaxe moderna para url opcional
  image: z
    .string()
    .url({ message: 'O formato da URL da imagem é inválido' })
    .or(z.literal('')) // Permite que o campo seja uma string vazia
    .optional(),
});

export const loginSchema = z.strictObject({
  username: z
    .string()
    .min(4, { message: 'Nome de usuário é obrigatório' })
    .regex(usernameRegex, {
      message: 'O nome de usuário deve conter apenas letras e números',
    })
    .toLowerCase(),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, { message: PASSWORD_ERROR_MESSAGE }),
});

export const createRootSchema = z
  .strictObject({
    username: z
      .string()
      .min(4, { message: 'Nome de usuário é obrigatório' })
      .regex(usernameRegex, {
        message: 'O nome de usuário deve conter apenas letras e números',
      })
      .toLowerCase(),
    name: z.string().min(NAME_MIN_LENGTH, { message: NAME_ERROR_MESSAGE }),
    email: z.string().email({ message: 'Email inválido' }).toLowerCase(),
  })
  .extend(passwordSchemaShape)
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirm'],
  });

export const createUserSchema = z
  .strictObject({
    username: z
      .string()
      .min(4, { message: 'Nome de usuário é obrigatório' })
      .regex(usernameRegex, {
        message: 'O nome de usuário deve conter apenas letras e números',
      })
      .toLowerCase(),
    name: z.string().min(NAME_MIN_LENGTH, { message: NAME_ERROR_MESSAGE }),
    email: z.string().email({ message: 'Email inválido' }).toLowerCase(),
    role: z.enum(['root', 'admin', 'journalist']).optional(),
    phone: z
      .string()
      .refine((val) => val === '' || /^\d{1,11}$/.test(val), {
        message: 'O telefone deve conter apenas números e no máximo 11 dígitos',
      })
      .optional(),
    image: z
      .string()
      .url({ message: 'URL da imagem inválida' })
      .or(z.literal(''))
      .optional(),
  })
  .extend(passwordSchemaShape)
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirm'],
  });

export const updateMyPasswordSchema = z
  .strictObject({
    currentPassword: z
      .string()
      .min(1, { message: 'A senha atual é obrigatória' }),
  })
  .extend(passwordSchemaShape)
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirm'],
  });

export const updateUserPasswordAsRootSchema = z
  .object(passwordSchemaShape)
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirm'],
  });

export const updateUserSchema = userProfileSchema.extend({
  role: z.enum(['root', 'admin', 'journalist']).optional(),
  active: z.boolean().optional(),
});

export const forgotPasswordSchema = z.strictObject({
  username: z
    .string()
    .min(4, { message: 'Nome de usuário é obrigatório' })
    .regex(usernameRegex, {
      message: 'O nome de usuário deve conter apenas letras e números',
    })
    .toLowerCase(),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, { message: 'O código token é obrigatório' }),
    ...passwordSchemaShape,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirm'],
  });

export const transferRootRoleConfirmationSchema = z.strictObject({
  targetUsername: z
    .string()
    .min(1, { message: 'O nome de usuário do alvo é obrigatório' }),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, { message: PASSWORD_ERROR_MESSAGE }),
});

export const deleteUserConfirmationSchema = z.strictObject({
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, { message: PASSWORD_ERROR_MESSAGE }),
});

export const updateMeSchema = z.strictObject({}).merge(userProfileSchema);
