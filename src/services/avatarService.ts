const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
import { Avatar } from "../types/avatar";
import { getToken } from "../utils/auth";

export async function createAvatar(dto: Avatar) {
  const res = await fetch(`${API_BASE_URL}/avatars/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error("Erro ao criar avatar");
  return res.json() as Promise<Avatar>;
}   

export async function updateAvatar(dto: Avatar) {
  const res = await fetch(`${API_BASE_URL}/avatars/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error("Erro ao atualizar avatar");
  return res.json() as Promise<Avatar>;
}

export async function getAvatar(id: number) {
  const res = await fetch(`${API_BASE_URL}/avatars/find/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Erro ao buscar avatar");
  return res.json() as Promise<Avatar>;
}