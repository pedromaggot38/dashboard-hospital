import api from './api.js';

export const fetchUser = async () => {
  try {
    const { data } = await api.get('/users/me');
    if (!data?.data?.user) {
      throw new Error('Nenhum usuário encontrado na sessão.');
    }
    return data.data.user;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Usuário não autenticado');
  }
};
