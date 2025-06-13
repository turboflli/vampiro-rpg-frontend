const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export async function login(username: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Erro ao fazer login");
  return res.json() as Promise<{ token: string }>;
}