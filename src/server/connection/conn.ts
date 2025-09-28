const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

type Props = {
  username: string,
  password: string, 
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json(); 
    throw new Error(errorData.message || `Erro do servidor: ${response.status}`);
  }
  return response.json(); 
}

export const loginAcces = async ({ username, password }: Props) => {
  const response = await fetch(`${SERVER_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      username: username,
      password: password,
    }).toString(),
    credentials: 'include',
  });
  return handleResponse(response);
}

export const createUser = async ({ username, password }: Props) => {
  const response = await fetch(`${SERVER_URL}/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }).toString(),
    credentials: 'include',
  });
  return handleResponse(response);
}

export const checkAuth = async () => {
  const response = await fetch(`${SERVER_URL}/user/auth`, {
    method: 'GET',
    credentials: 'include',
  });
  return handleResponse(response);
};

export const logout = async () => {
  await fetch(`${SERVER_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}