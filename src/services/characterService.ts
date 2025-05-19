const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
import { Character, CharacterSummary, Clan, Road } from "../types/character";

export async function createCharacter(dto: Character) {
  const res = await fetch(`${API_BASE_URL}/characters/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error("Erro ao criar personagem");
}

export async function getCharacter(id: number) {
  const res = await fetch(`${API_BASE_URL}/characters/find/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Erro ao buscar personagem");
  return res.json() as Promise<Character>;
}

export async function getCharacterByName(name: string) {
  const res = await fetch(`${API_BASE_URL}/characters/findByName/${name}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Erro ao buscar personagem");
  return res.json() as Promise<CharacterSummary[]>;
}

export async function getAllCharacters() {
  const res = await fetch(`${API_BASE_URL}/characters/all`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Erro ao buscar personagens");
  return res.json() as Promise<Character[]>;
}

export async function getSummary() {
  const res = await fetch(`${API_BASE_URL}/characters/summary`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Erro ao buscar resumo");
  return res.json() as Promise<CharacterSummary[]>;
}

export async function getAllClans() {
  const res = await fetch(`${API_BASE_URL}/extra/clans`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Erro ao buscar clãs");
  return res.json() as Promise<Clan[]>;
}

export async function getAllRoads() {
  const res = await fetch(`${API_BASE_URL}/extra/roads`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Erro ao buscar clãs");
  return res.json() as Promise<Road[]>;
}