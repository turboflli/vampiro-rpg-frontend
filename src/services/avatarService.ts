const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
import { Avatar } from "../types/avatar";

export async function createAvatar(dto: Avatar) {
  const res = await fetch(`${API_BASE_URL}/avatars/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error("Erro ao criar avatar");
  return res.json() as Promise<Avatar>;
}   

export async function updateAvatar(dto: Avatar) {
  const res = await fetch(`${API_BASE_URL}/avatars/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error("Erro ao atualizar avatar");
  return res.json() as Promise<Avatar>;
}

export async function getAvatar(id: number) {
  const res = await fetch(`${API_BASE_URL}/avatars/find/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Erro ao buscar avatar");
  return res.json() as Promise<Avatar>;
}