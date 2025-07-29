const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
import { Block} from "../types/block";
import { getToken } from "../utils/auth";

export async function createBlock(dto: Block) {
  const res = await fetch(`${API_BASE_URL}/blocks/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error("Erro ao criar bloco");
  return res.json() as Promise<Block>;
}
  
export async function getAllBlocks() {
  const res = await fetch(`${API_BASE_URL}/blocks/all`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Erro ao buscar blocos");
  return res.json() as Promise<Block[]>;
}

export async function deleteBlock(id: number) {
  const res = await fetch(`${API_BASE_URL}/blocks/delete/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Erro ao deletar bloco");
  return res.json() as Promise<void>;
}