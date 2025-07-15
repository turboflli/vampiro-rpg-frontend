import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Domain } from "../types/place";
import { getAllDomains, getDomainByName } from "../services/placeService";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { CharacterSummary } from "../types/character";
import { getSpecificSummary } from "../services/characterService";

export default function DomainList() {
    const { t } = useTranslation("place");
    const [domains, setDomains] = useState<Domain[]>([]);
    const [characters, setCharacters] = useState<CharacterSummary[]>([]);

    useEffect(() => {
        getAllDomains()
            .then(data => {
                setDomains(data)
                const characterIds = Array.from(new Set(data.map(domain => domain.characterId))).filter(id => id) as number[];
                characterIds.map(id => {
                    getSpecificSummary(id)
                        .then(data => setCharacters(prev => [...prev, data]))
                        .catch(() => alert("Erro ao buscar personagens"));
                })
            })
            .catch(() => alert("Erro ao buscar domínios"));
    }, []);

    const findDomainByName = (name: string) => {
        if (!name) {
            getAllDomains()
                .then(data => setDomains(data))
                .catch(() => alert("Erro ao buscar domínios"));
            return;
        }
        getDomainByName(name)
            .then(data => setDomains(data))
            .catch(() => alert("Erro ao buscar domínios"));
    }

    const buildLabel = (characterId?: number) => {
        const character = characters.find(c => c.id === characterId);
        if (!character) return "";
        return `${character.name} - ${character.clanName} - ${character.roadName} - ${character.generation}ª`;
    }
    
    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-10 text-black">
            <h1 className="text-2xl font-bold text-center mb-6">{t("titleDomain")}</h1>
            <Link to="/createDomain" className="flex items-center text-blue-600 hover:underline">
                <Plus className="h-5 w-5 mr-2" /> {t("newDomain")}
            </Link>
            <input type="text" placeholder={t("searchDomain")} onChange={e => {
                const timeout = setTimeout(() => findDomainByName(e.target.value), 500);
                return () => clearTimeout(timeout);
            }} className="w-full p-2 border border-gray-300 rounded mb-4"/>
            <div className="grid grid-cols-2 gap-4">
                {domains.map(domain => (
                    <Link to={`/editDomain/${domain.id}`} key={domain.id} className="border border-solid border-2 p-4 rounded hover:bg-gray-100" style={{ borderColor: domain.color }}>
                        <h2 className="text-lg font-semibold">{domain.name}</h2>
                        <p>{t("character")}: {buildLabel(domain.characterId)}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
