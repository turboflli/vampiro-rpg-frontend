import { useEffect, useState } from "react";
import { getRoutinesByCharacterId, getRoutinesByPlaceId } from "../services/routineService";
import { RoutineExibition } from "../types/routine";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AutoCompleteSelect from "./AutoCompleteSelect";
import { Place } from "../types/place";
import { CharacterSummary } from "../types/character";
import { getAllPlaces } from "../services/placeService";
import { getSummary } from "../services/characterService";
import { RoutineTable } from "./RoutineTable";

export default function RoutineList() {
    const [routines, setRoutines] = useState<RoutineExibition[]>([]);
    const { characterId, placeId } = useParams();
    const { t } = useTranslation("routine");
    const [places, setPlaces] = useState<Place[]>([]);
    const [characters, setCharacters] = useState<CharacterSummary[]>([]);
    const [view, setView] = useState<"character" | "place">("character");
    const [label, setLabel] = useState<string>("");

    useEffect(() => {
        getAllPlaces()
            .then(data => setPlaces(data))
            .catch(() => alert("Erro ao buscar lugares"));
        getSummary()
            .then(data => setCharacters(data))
            .catch(() => alert("Erro ao buscar resumo"));
    }, []);

    useEffect(() => {
        if (characterId) {
            setView("character");
            setLabel(buildLabel(characters.find(c => c.id === Number(characterId))!));
            getRoutinesByCharacterId(Number(characterId))
                .then(data => setRoutines(data))
                .catch(() => alert("Erro ao buscar rotinas"));
        } else if (placeId) {
            setView("place");
            setLabel(places.find(p => p.id === Number(placeId))?.name || "");
            getRoutinesByPlaceId(Number(placeId))
                .then(data => setRoutines(data))
                .catch(() => alert("Erro ao buscar rotinas"));
        }
    }, [characterId, placeId]);
    
    const handleCharacterChange = (character: CharacterSummary | null) => {
        if (character) {
            setView("character");
            setLabel(buildLabel(character));
            getRoutinesByCharacterId(character.id)
                .then(data => setRoutines(data))
                .catch(() => alert("Erro ao buscar rotinas"));
        }
    }
    const handlePlaceChange = (place: Place | null) => {
        if (place) {
            setView("place");
            setLabel(place.name);
            getRoutinesByPlaceId(place.id!)
                .then(data => setRoutines(data))
                .catch(() => alert("Erro ao buscar rotinas"));
        }
    }

    const buildLabel = (character: CharacterSummary) => {
        return `${character.name} - ${character.clanName} - ${character.roadName} - ${character.generation}ª`;
    }
    
    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-10 text-black">
            <h1 className="text-2xl font-bold text-center mb-6">{t("titleRoutine")}</h1>
            <div className="grid grid-cols-2 gap-4">
                <AutoCompleteSelect<CharacterSummary>
                    label={t("selectCharacter")}
                    options={characters}
                    getLabel={character => buildLabel(character)}
                    value={characterId ? Number(characterId) : null}
                    onChange={handleCharacterChange}
                />
                <AutoCompleteSelect<Place>
                    label={t("selectPlace")}
                    options={places}
                    getLabel={place => place.name}
                    value={placeId ? Number(placeId) : null}
                    onChange={handlePlaceChange}
                />
            </div>
            <div>
                <RoutineTable routines={routines} view={view} label={label} />
            </div>
        </div>
    );
}