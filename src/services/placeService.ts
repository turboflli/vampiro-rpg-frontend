const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
import { Place, Domain} from "../types/place";
import { getToken } from "../utils/auth";

export async function createPlace(dto: Place) {
  const res = await fetch(`${API_BASE_URL}/places/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error("Erro ao criar lugar");
  return res.json() as Promise<Place>;
}

export async function updatePlace(dto: Place) {
  const res = await fetch(`${API_BASE_URL}/places/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error("Erro ao atualizar lugar");
  return res.json() as Promise<Place>;
}


export async function getPlace(id: number) {
  const res = await fetch(`${API_BASE_URL}/places/find/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Erro ao buscar lugar");
  return res.json() as Promise<Place>;
}

export async function getAllPlaces() {
  const res = await fetch(`${API_BASE_URL}/places/all`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Erro ao buscar lugares");
  return res.json() as Promise<Place[]>;
}

export async function getPlaceByName(name: string) {
  const res = await fetch(`${API_BASE_URL}/places/findByName/${name}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Erro ao buscar lugar");
  return res.json() as Promise<Place[]>;
}

export async function deletePlace(id: number) {
  const res = await fetch(`${API_BASE_URL}/places/delete/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Erro ao deletar lugar");
  return;
}

export async function getPlaceByDomainId(id: number) {
  const res = await fetch(`${API_BASE_URL}/places/domain/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Erro ao buscar lugar");
  return res.json() as Promise<Place[]>;
}

export async function createDomain(dto: Domain) {
  const res = await fetch(`${API_BASE_URL}/domains/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error("Erro ao criar domínio");
  return res.json() as Promise<Domain>;
}

export async function updateDomain(dto: Domain) {
  const res = await fetch(`${API_BASE_URL}/domains/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error("Erro ao atualizar domínio");
  return res.json() as Promise<Domain>;
}

export async function getDomain(id: number) {
  const res = await fetch(`${API_BASE_URL}/domains/find/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Erro ao buscar domínio");
  return res.json() as Promise<Domain>;
}

export async function getAllDomains() {
  const res = await fetch(`${API_BASE_URL}/domains/all`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Erro ao buscar domínios");
  return res.json() as Promise<Domain[]>;
}

export async function getAllCharactersIds() {
  const res = await fetch(`${API_BASE_URL}/domains/characterIds`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Erro ao buscar ids de personagens");
  return res.json() as Promise<number[]>;
}

export async function getDomainByName(name: string) {
  const res = await fetch(`${API_BASE_URL}/domains/findByName/${name}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Erro ao buscar domínio");
  return res.json() as Promise<Domain[]>;
}

export async function getDomainByCharacterId(id: number) {
  const res = await fetch(`${API_BASE_URL}/domains/character/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Erro ao buscar domínio");
  return res.json() as Promise<Domain[]>;
}

export async function deleteDomain(id: number) {
  const res = await fetch(`${API_BASE_URL}/domains/delete/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Erro ao deletar domínio");
  return;
}

    