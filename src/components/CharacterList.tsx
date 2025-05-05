import { useEffect, useState } from "react";
import { CharacterSummary } from "../types/character";
import { getCharacterByName, getSummary } from "../services/characterService";
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'


export default function CharacterList() {

    const [characters, setCharacters] = useState<CharacterSummary[]>([]);

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
            <h1 className="text-2xl font-bold text-center mb-6">Lista de Personagens</h1>
            <Link to="/create" className="flex items-center text-blue-600 hover:underline">
                <Plus className="h-5 w-5 mr-2" />  novo personagem
            </Link>
            <input type="text" placeholder="Buscar personagem" onChange={e => {
                const timeout = setTimeout(() => findCharacterByName(e.target.value), 500);
                return () => clearTimeout(timeout);
            }}/>
            <div className="grid grid-cols-2 gap-4">
                {characters.map(character => (
                    <Link to={`/edit/${character.id}`} key={character.id} className="border p-4 rounded hover:bg-gray-100">
                        <h2 className="text-lg font-semibold">{character.name}</h2>
                        <p>{character.clanName} - 
                        {character.roadName} - 
                        {character.generation}ª Geração</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}   