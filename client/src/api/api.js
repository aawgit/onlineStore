import axios from 'axios'

//Instanciamos axios
const api = axios.create();

//Funcion para enviar la informacion a la api, nos da una respuesta
export const registerUser = async (newUser) => {
  const { message } = await api.post('/api/auth/register', {
    data: {
      name: newUser.fullName,
      email: newUser.email,
      password: newUser.password,
    }
  });

  return message;
};

//Function to log in
export const loginUser = async (user) => {
  try {
    const response = await api.post('/api/auth/login', {
      data: {
        email: user.email,
        password: user.password
      }
    });

    sessionStorage.setItem('user', JSON.stringify({ jwtToken: response.data.token, userId: response.data.userId, name: response.data.name }));

    return response;

  } catch (error) {

    return error;
  }
};
