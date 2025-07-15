import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Domain } from "../types/place";
import { CharacterSummary } from "../types/character";
import { initialDomain } from "../types/initials";
import { createDomain, getDomain, updateDomain } from "../services/placeService";
import {getSummary} from "../services/characterService"

export default function DomainForm() {
    const { t } = useTranslation("place");
    const navigate = useNavigate();
    const [domain, setDomain] = useState<Domain>(initialDomain);
    const [summary, setSummary] = useState<CharacterSummary[]>([]);
    const { id } = useParams();

    useEffect(() => {
        getSummary()
          .then(data => {
            setSummary(data);
          })
          .catch(() => alert("Erro ao buscar resumo"));
    } , [])

    useEffect(() => {
        if (id) {
          getDomain(Number(id))
            .then(data => {
              setDomain(data);
            })
            .catch(() => alert("Erro ao buscar domínio"));
        }
      }, [id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            updateDomain(domain)
            .then(() => alert(t('domainUpdated')))
            .catch(() => alert(t('errorUpdatingDomain')));
            navigate("/domain");
        } else {
            createDomain(domain)
            .then(() => alert(t('domainCreated')))
            .catch(() => alert(t('errorCreatingDomain')));
            navigate("/domain");
        }
    }
    const buildLabel = (character: CharacterSummary) => {
        return `${character.name} - ${character.clanName} - ${character.roadName} - ${character.generation}ª`;
    }
    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white shadow-2xl rounded-lg text-black space-y-6">
            <h1 className="text-2xl font-bold text-center">{t('domain')}</h1>

            {/* Linha: Cor + Nome */}
            <div className="flex items-center gap-4">
                <input
                type="color"
                value={domain.color}
                onChange={e => setDomain({ ...domain, color: e.target.value })}
                className="w-12 h-12 border rounded"
                title={t('color')}
                required
                />
                <input
                type="text"
                placeholder={t('name')}
                value={domain.name}
                onChange={e => setDomain({ ...domain, name: e.target.value })}
                className="flex-1 border p-2 rounded bg-white"
                required
                />
            </div>

            {/* Seleção de personagem */}
            <div>
                <select
                value={domain.characterId}
                onChange={e => setDomain({ ...domain, characterId: Number(e.target.value) })}
                className="w-full border p-2 rounded bg-white"
                required
                >
                    <option value="">{t('selectCharacter')}</option>
                {summary.map(character => (
                    <option key={character.id} value={character.id}>
                    {buildLabel(character)}
                    </option>
                ))}
                </select>
            </div>

            {/* Botão */}
            <div className="text-center">
                <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded"
                >
                {t('create')}
                </button>
            </div>
            </form>
    );
}