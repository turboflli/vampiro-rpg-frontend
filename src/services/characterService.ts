import { Character } from "../types/character";

export async function createCharacter(dto: Character) {
  const res = await fetch("/api/characters/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error("Erro ao criar personagem");
}

export async function getCharacter(id: number) {
  const res = await fetch(`/api/characters/find/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Erro ao buscar personagem");
  return res.json() as Promise<Character>;
}

export async function getAllCharacters() {
  const res = await fetch("/api/characters/all", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Erro ao buscar personagens");
  return res.json() as Promise<Character[]>;
}

export async function getAllClans() {
  const res = await fetch("/api/extra/clans", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Erro ao buscar clãs");
  return res.json() as Promise<any[]>;
}

export async function getAllRoads() {
  const res = await fetch("/api/extra/roads", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Erro ao buscar clãs");
  return res.json() as Promise<any[]>;
}