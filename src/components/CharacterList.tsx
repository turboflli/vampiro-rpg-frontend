import { useEffect, useState } from "react";
import { CharacterSummary } from "../types/character";
import { deleteCharacter, getCharacterByName, getSummary } from "../services/characterService";
import { getAllCharactersIds } from "../services/placeService";
import { Link } from 'react-router-dom'
import { Crown, Plus, Trash } from 'lucide-react'
import { useTranslation } from "react-i18next";

export default function CharacterList() {

    const [characters, setCharacters] = useState<CharacterSummary[]>([]);
    const [domainOwnersIds, setDomainOwnersIds] = useState<number[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        getSummary()
            .then(data => setCharacters(data))
            .catch(() => alert("Erro ao buscar resumo"));
        getAllCharactersIds()
            .then(data => setDomainOwnersIds(data))
            .catch(() => alert("Erro ao buscar ids de personagens"));
    }, []);

    const findCharacterByName = (name: string) => {
        if (!name) {
            getSummary()
                .then(data => setCharacters(data))
                .catch(() => alert("Erro ao buscar resumo"));
            return;
        }
        getCharacterByName(name)
            .then(data => setCharacters(data))
            .catch(() => alert("Erro ao buscar personagens"));
    }

    const removeCharacter = (id: number) => {
        if (!confirm(t("deleteCharacterConfirm"))) {
            return;
        }
        deleteCharacter(id)
            .then(() => {
                getSummary()
                    .then(data => setCharacters(data))
                    .catch(() => alert("Erro ao buscar resumo"));
            })
            .catch(() => alert("Erro ao deletar personagem"));
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
            }} className="w-full p-2 border border-gray-300 rounded mb-4"/>
            <div className="grid grid-cols-2 gap-4">
                {characters.map(character => (
                    <div key={character.id} className="relative border border-solid border-2 p-4 rounded hover:bg-gray-100">
                    <Link to={`/edit/${character.id}`} >
                        <h2 className="flex items-center gap-2 text-lg font-semibold">
                            {character.name}
                            {domainOwnersIds.includes(character.id) && 
                            <Crown className="h-5 w-5 text-yellow-300" />}
                        </h2>
                    </Link>
                    <p>{t("clan")}: {character.clanName} - 
                    {t("road")}: {character.roadName} - 
                    {t("generation")}: {character.generation}ª</p>
                    <button onClick={() => removeCharacter(character.id!)} className="bg-red-500 hover:bg-red-600 text-white rounded absolute z-10 bottom-2 right-2">
                        <Trash className="h-5 w-5" />
                    </button>
                    </div>
                ))}
            </div>
        </div>
    );
}   