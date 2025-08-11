const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
import { Routine, RoutineExibition } from "../types/routine";
import { getToken } from "../utils/auth";

export async function getRoutine(id: number) {
  const res = await fetch(`${API_BASE_URL}/routines/find/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Erro ao buscar rotina");
  return res.json() as Promise<Routine>;
}

export async function createRoutine(dto: Routine) {
  const res = await fetch(`${API_BASE_URL}/routines/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error("Erro ao criar rotina");
  return res.json() as Promise<Routine>;
}

export async function updateRoutine(dto: Routine) {
  const res = await fetch(`${API_BASE_URL}/routines/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error("Erro ao atualizar rotina");
  return res.json() as Promise<Routine>;
}

export async function deleteRoutine(id: number) {
  const res = await fetch(`${API_BASE_URL}/routines/delete/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Erro ao deletar rotina");
  return;
}

export async function getRoutinesByCharacterId(characterId: number) {
  const res = await fetch(`${API_BASE_URL}/routines/character/${characterId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Erro ao buscar rotinas do personagem");
  return res.json() as Promise<RoutineExibition[]>;
}

export async function getRoutinesByPlaceId(placeId: number) {
  const res = await fetch(`${API_BASE_URL}/routines/place/${placeId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Erro ao buscar rotinas do local");
  return res.json() as Promise<RoutineExibition[]>;
}