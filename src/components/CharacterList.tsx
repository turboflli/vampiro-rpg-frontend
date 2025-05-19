import { useEffect, useState } from "react";
import { CharacterSummary } from "../types/character";
import { getCharacterByName, getSummary } from "../services/characterService";
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useTranslation } from "react-i18next";

export default function CharacterList() {

    const [characters, setCharacters] = useState<CharacterSummary[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        getSummary()
            .then(data => setCharacters(data))
            .catch(() => alert("Erro ao buscar resumo"));
    }, []);

    const findCharacterByName = (name: string) => {
        getCharacterByName(name)
            .then(data => setCharacters(data))
            .catch(() => alert("Erro ao buscar personagens"));
    }
    
    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-10 text-black">
            <h1 className="text-2xl font-bold text-center mb-6">{t("title")}</h1>
            <Link to="/create" className="flex items-center text-blue-600 hover:underline">
                <Plus className="h-5 w-5 mr-2" /> {t("newCharacter")}
            </Link>
            <input type="text" placeholder={t("searchCharacter")} onChange={e => {
                const timeout = setTimeout(() => findCharacterByName(e.target.value), 500);
                return () => clearTimeout(timeout);
            }}/>
            <div className="grid grid-cols-2 gap-4">
                {characters.map(character => (
                    <Link to={`/edit/${character.id}`} key={character.id} className="border p-4 rounded hover:bg-gray-100">
                        <h2 className="text-lg font-semibold">{character.name}</h2>
                        <p>{t("clan")}: {character.clanName} - 
                        {t("road")}: {character.roadName} - 
                        {t("generation")}: {character.generation}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}   