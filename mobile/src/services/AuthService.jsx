export const login = async (username, password) => {
  // Simulación de un proceso de autenticación
  if (username === 'user' && password === 'password') {
    return Promise.resolve(true);
  } else {
    return Promise.reject('Credenciales incorrectas');
  }
};
