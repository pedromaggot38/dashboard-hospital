import { z } from 'zod';

const usernameRegex = /^[a-zA-Z0-9]+$/;

const PASSWORD_MIN_LENGTH = 4;
const NAME_MIN_LENGTH = 4;
const NAME_ERROR_MESSAGE = `O nome deve ter no mínimo ${NAME_MIN_LENGTH} caracteres`;
const PASSWORD_ERROR_MESSAGE = `A senha deve ter no mínimo ${PASSWORD_MIN_LENGTH} caracteres`;

// Schema base para senhas, para ser reutilizado
const passwordSchemaShape = {
  password: z.string().min(PASSWORD_MIN_LENGTH, PASSWORD_ERROR_MESSAGE),
  passwordConfirm: z.string().min(PASSWORD_MIN_LENGTH, PASSWORD_ERROR_MESSAGE),
};

const userProfileSchema = z.object({
  name: z.string().min(NAME_MIN_LENGTH, NAME_ERROR_MESSAGE).optional(),
  email: z
    .preprocess(
      (val) => (val === '' || val === undefined ? null : val),
      z.string().email('O formato do e-mail é inválido').nullable()
    )
    .optional(),
  phone: z
    .string()
    .optional()
    .transform((val) => (val === '' || val === undefined ? null : val))
    .refine((val) => val === null || /^\d{1,11}$/.test(val), {
      message: 'O telefone deve conter apenas números e no máximo 11 dígitos',
    }),
  image: z
    .union([
      z.string().url('O formato da URL da imagem é inválido'),
      z.literal(''),
    ])
    .optional()
    .transform((val) => (val === '' ? null : val)),
});

export const loginSchema = z.strictObject({
  username: z
    .string()
    .min(4, 'Nome de usuário é obrigatório')
    .regex(usernameRegex, {
      message: 'O nome de usuário deve conter apenas letras e números',
    })
    .toLowerCase(),
  password: z.string().min(PASSWORD_MIN_LENGTH, PASSWORD_ERROR_MESSAGE),
});

export const createRootSchema = z
  .strictObject({
    username: z
      .string()
      .min(4, 'Nome de usuário é obrigatório')
      .regex(
        usernameRegex,
        'O nome de usuário deve conter apenas letras e números'
      )
      .toLowerCase(),
    name: z.string().min(NAME_MIN_LENGTH, NAME_ERROR_MESSAGE),
    email: z.string().email('Email inválido').toLowerCase(),
  })
  .extend(passwordSchemaShape) // AJUSTE FINAL: Usando .extend()
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirm'],
  });

export const createUserSchema = z
  .strictObject({
    username: z
      .string()
      .min(4, 'Nome de usuário é obrigatório')
      .regex(
        usernameRegex,
        'O nome de usuário deve conter apenas letras e números'
      )
      .toLowerCase(),
    name: z.string().min(NAME_MIN_LENGTH, NAME_ERROR_MESSAGE),
    email: z.string().email('Email inválido').toLowerCase(),
    role: z.enum(['root', 'admin', 'journalist']).optional(),
    phone: z
      .string()
      .optional()
      .transform((val) => (val === '' || val === undefined ? null : val))
      .refine((val) => val === null || /^\d{1,11}$/.test(val), {
        message: 'O telefone deve conter apenas números e no máximo 11 dígitos',
      }),
    image: z
      .string()
      .transform((val) => (val === '' ? null : val))
      .refine((val) => val === null || /^https?:\/\/.+\..+/.test(val), {
        message: 'URL da imagem inválida',
      })
      .optional(),
  })
  .extend(passwordSchemaShape) // AJUSTE FINAL: Usando .extend()
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirm'],
  });

export const updateMyPasswordSchema = z
  .strictObject({
    currentPassword: z.string().min(1, 'A senha atual é obrigatória'),
  })
  .extend(passwordSchemaShape) // AJUSTE FINAL: Usando .extend()
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
    .min(4, 'Nome de usuário é obrigatório')
    .regex(usernameRegex, {
      message: 'O nome de usuário deve conter apenas letras e números',
    })
    .toLowerCase(),
});

export const resetPasswordSchema = z
  .object(passwordSchemaShape)
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirm'],
  });

export const transferRootRoleConfirmationSchema = z.strictObject({
  targetUsername: z.string().min(1, 'O nome de usuário do alvo é obrigatório'),
  password: z.string().min(PASSWORD_MIN_LENGTH, PASSWORD_ERROR_MESSAGE),
});

export const deleteUserConfirmationSchema = z.strictObject({
  password: z.string().min(PASSWORD_MIN_LENGTH, PASSWORD_ERROR_MESSAGE),
});

export const updateMeSchema = z.strictObject({}).merge(userProfileSchema); // .merge() aqui está correto pois são dois schemas de objeto completos
