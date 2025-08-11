import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CharacterSummary } from '../types/character';
import { getSummary } from '../services/characterService';
import { useParams } from 'react-router-dom';
import { Routine } from '../types/routine';
import { initialRoutine } from '../types/initials';
import { getRoutine } from '../services/routineService';
import { Place } from '../types/place';
import { getAllPlaces } from '../services/placeService';
import { createRoutine, updateRoutine } from '../services/routineService';

export default function RoutineForm() {
    const [summary, setSummary] = useState<CharacterSummary[]>([]);
    const [places, setPlaces] = useState<Place[]>([]);
    const [routine, setRoutine] = useState<Routine>(initialRoutine);
    const { id, characterId, placeId } = useParams();
    
    const { t } = useTranslation("routine");

    useEffect(() => {
        getSummary()
          .then(data => {
            setSummary(data);
            if (characterId) {
                setRoutine({ ...routine, characterId: Number(characterId) });
            }
          })
          .catch(() => alert("Erro ao buscar resumo"));
          getAllPlaces()
            .then(data => {
                setPlaces(data)
                if (placeId) {
                    setRoutine({ ...routine, placeId: Number(placeId) });
                }
            })
            .catch(() => alert("Erro ao buscar lugares"));
    } , [])

    useEffect(() => {
        if (id) {
          getRoutine(Number(id))
            .then(data => {
              setRoutine(data);
            })
            .catch(() => alert("Erro ao buscar rotina"));
        }
      }, [id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        saveRoutine();
    }
    const saveRoutine = () => {
        if (id) {
            updateRoutine(routine)
              .then(() => alert("Rotina atualizada com sucesso"))
              .catch(() => alert("Erro ao atualizar rotina"));
        } else {
            createRoutine(routine)
              .then(() => alert("Rotina criada com sucesso"))
              .catch(() => alert("Erro ao criar rotina"));
        }
    }
    const buildLabel = (character: CharacterSummary) => {
        return `${character.name} - ${character.clanName} - ${character.roadName} - ${character.generation}ª`;
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-10 text-black">
            <h1 className="text-2xl font-bold text-center mb-6">{t('createRoutine')}</h1>
            <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-4">
                
                <div>
                    <select
                    value={routine.characterId}
                    onChange={e => setRoutine({ ...routine, characterId: Number(e.target.value) })}
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
                
                <div>
                    <select
                    value={routine.placeId}
                    onChange={e => setRoutine({ ...routine, placeId: Number(e.target.value) })}
                    className="w-full border p-2 rounded bg-white"
                    required
                    >
                        <option value="">{t('selectPlace')}</option>
                    {places.map(place => (
                        <option key={place.id} value={place.id}>
                        {place.name}
                        </option>
                    ))}
                    </select>
                </div>
                
                <div>
                    <label htmlFor="startTime">{t('startTime')}</label>
                    <input type="time" id="startTime" name="startTime" value={routine.startTime} onChange={e => setRoutine({ ...routine, startTime: e.target.value })} className="w-full border p-2 rounded bg-white" required />
                </div>
                
                <div>
                    <label htmlFor="endTime">{t('endTime')}</label>
                    <input type="time" id="endTime" name="endTime" value={routine.endTime} onChange={e => setRoutine({ ...routine, endTime: e.target.value })} className="w-full border p-2 rounded bg-white" required />
                </div>
                
                <div>
                    <select
                    value={routine.weekday}
                    onChange={e => setRoutine({ ...routine, weekday: Number(e.target.value) })}
                    className="w-full border p-2 rounded bg-white"
                    required
                    >
                        <option value="">{t('selectWeekday')}</option>
                        <option value="1">{t('sunday')}</option>
                        <option value="2">{t('monday')}</option>
                        <option value="3">{t('tuesday')}</option>
                        <option value="4">{t('wednesday')}</option>
                        <option value="5">{t('thursday')}</option>
                        <option value="6">{t('friday')}</option>
                        <option value="7">{t('saturday')}</option>
                        
                    </select>
                </div>
                
                <div>
                    <label htmlFor="description">{t('description')}</label>
                    <input type="text" id="description" name="description" value={routine.description} onChange={(e) => setRoutine({ ...routine, description: e.target.value })} className="w-full p-2 border border-gray-300 rounded" required/>
                </div>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">{t('save')}</button>
            </div>
        </form>
    );
}
