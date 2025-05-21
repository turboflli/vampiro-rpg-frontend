import { useState, useEffect } from "react";
import type { Backgrounds, Character, Clan, Discipline, Flaws, Merits, Road } from "../types/character";
import DotRating from "./DotRating";
import AutoCompleteSelect from "./AutoCompleteSelect";
import { ChevronDown, ChevronUp, Trash, Plus, Save } from 'lucide-react';
import SquareRating from "./SquareRating";
import TraitTypeSelect from "./TraitTypeSelect";
import { useTranslation } from "react-i18next"; 

interface Props {
    form: Character;
    update: (field: string, value: string | number | null | Array<any>) => void;
    selectedClan: Clan | null;
    setSelectedClan: (clan: Clan | null) => void;
    selectedRoad: Road | null;
    setSelectedRoad: (road: Road | null) => void;
    clans: Clan[];
    roads: Road[];
    saveCharacter: () => void;
}

export default function CreateCharacterForm({ form, update, selectedClan, setSelectedClan, selectedRoad, setSelectedRoad, clans, roads, saveCharacter }: Props) {
    const { t } = useTranslation();
    

    // Colapsáveis
    const [showAtributos, setShowAtributos] = useState(true);
    const [showTalentos, setShowTalentos] = useState(true);
    const [showHabilidades, setShowHabilidades] = useState(true);
    const [showConhecimentos, setShowConhecimentos] = useState(true);
    const [showExtras, setShowExtras] = useState(true);
    const [showTraits, setShowTraits] = useState(true);

  // Update weakness when selectedClan changes
  useEffect(() => {
    if (selectedClan) {
      update("weakness", selectedClan.weakness);
    }
  }, [selectedClan]);

  const handleClanChange = (clan: Clan | null) => {
    if (clan) {
      update("clanId", clan.id);
      setSelectedClan(clan);
    } if (clan === null) {
      update("clanId", null);
      setSelectedClan(null);
    }
  };

  const handleRoadChange = (road: Road | null) => {
    if (road) {
      update("roadId", road.id);      
      setSelectedRoad(road);
    } if (road === null) {
      update("roadId", null);
      setSelectedRoad(null);
    }
  };

  const addDisciplina = () => {
    update("disciplines", [...form.disciplines, { name: "", score: 0 }]);
  };

  const updateDisciplina = (i: number, field: keyof Discipline, value: number) => {
    const copy = [...form.disciplines];
    (copy[i][field] as any) = value;
    update("disciplines", copy);
  };

  const removeDisciplina = (i: number) => {
    const copy = [...form.disciplines];
    copy.splice(i, 1);
    update("disciplines", copy);
  };

  const addBackground = () => {
    update("backgrounds", [...form.backgrounds, { name: "", score: 0 }]);
  }

  const updateBackground = (i: number, field: keyof Backgrounds, value: number) => {
    const copy = [...form.backgrounds];
    (copy[i][field] as any) = value;
    update("backgrounds", copy);
  };

  const removeBackground = (i: number) => {
    const copy = [...form.backgrounds];
    copy.splice(i, 1);
    update("backgrounds", copy);
  };
  const addFlaw = () => {
    update("flaws", [...form.flaws, { name: "", type: "", score: 0 }]);
  }

  const updateFlaw = (i: number, field: keyof Flaws, value: string | number) => {
      const copy = [...form.flaws];
      (copy[i][field] as any) = value;
      update("flaws", copy);
    };

  const removeFlaw = (i: number) => {
    const copy = [...form.flaws];
    copy.splice(i, 1);
    update("flaws", copy);
  };

  const addMerit = () => {
    update("merits", [...form.merits, { name: "", type: "", score: 0 }]);
  }

  const updateMerit = (i: number, field: keyof Merits, value: string | number) => {
    const copy = [...form.merits];
    (copy[i][field] as any) = value;
    update("merits", copy);
  };

  const removeMerit = (i: number) => {
    const copy = [...form.merits];
    copy.splice(i, 1);
    update("merits", copy);
  };

  const buildClanTooltip = (clan: Clan) => {
    return clan.discipline1 + "; " + clan.discipline2 +"; " + clan.discipline2 + "; " + clan.weakness
  };

  const buildRoadTooltip = (road: Road) => {
    return (
      `${t('aura')}: ${road.aura}\n` +
      `${t('ethics')}: ${road.ethics}\n` +
      `${t('sins')}: ${road.sins}\n` +
      `${road.useConscience ? t('conscience') : t('conviction')} e ` +
      `${road.useSelf_control ? t('selfControl') : t('instinct')}`
    );
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    saveCharacter();
    
  };

  function encontrarLimiteMaximoDeSangue(): number {
    // The maximum blood pool is determined by the character's generation
    // Assuming the generation is between 4 and 15 as per the input constraints
    const generationToBloodPoolMap: { [key: number]: number } = {
      4: 50,
      5: 40,
      6: 30,
      7: 20,
      8: 15,
      9: 14,
      10: 13,
      11: 12,
      12: 11,
      13: 10,
      14: 10,
      15: 10,
    };

    return generationToBloodPoolMap[form.generation] || 10; // Default to 10 if generation is out of range
  }

  return (

<form onSubmit={handleSubmit} className="max-w-7xl w-full p-6 bg-white shadow-2xl rounded-lg text-black ">
      <h1 className="text-2xl font-bold text-center mb-6">{t('createCharacter')}</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <input className="border p-2 rounded bg-white" placeholder={t('name')} value={form.name} onChange={e => update("name", e.target.value)} required />
        <input className="border p-2 rounded bg-white" placeholder={t('concept')} value={form.concept} onChange={e => update("concept", e.target.value)} />
        <input className="border p-2 rounded bg-white" placeholder={t('nature')} value={form.nature} onChange={e => update("nature", e.target.value)} />
        <input className="border p-2 rounded bg-white" placeholder={t('demeanor')} value={form.demeanor} onChange={e => update("demeanor", e.target.value)} />
        <input className="border p-2 rounded bg-white" placeholder={t('generation')} type="number" min="4" max="15" value={form.generation} onChange={e => update("generation", e.target.value)} />
        <input className="border p-2 rounded bg-white" placeholder={t('sire')} value={form.sire} onChange={e => update("sire", e.target.value)} />

        <AutoCompleteSelect<Clan>
          label={t('clan')}
          options={clans}
          value={form.clanId}
          onChange={(clan) => handleClanChange(clan)}
          getLabel={(clan) => clan.name}
          getTooltip={buildClanTooltip}
        />

        <AutoCompleteSelect<Road>
          label={t('road')}
          options={roads}
          value={form.roadId}
          onChange={(road) => handleRoadChange(road)}
          getLabel={(road) => road.name + " - " + road.pathName}
          getTooltip={buildRoadTooltip}
        />
      </div>

      {/* Atributos */}
      <fieldset className="mt-6 ">
      <div className="text-lg font-semibold mb-2 flex justify-center items-center gap-2">
          <h3 className="font-medium mb-2">{t('attributes')}  </h3>
          <button type="button" className="text-sm text-blue-600" onClick={() => setShowAtributos(v => !v)}>
          {showAtributos ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
        {showAtributos && (
          <div className="grid grid-cols-3 gap-4">
            <div>
            <DotRating label={t('strength')} value={form.strength} onChange={v => update("strength", v)} />
            <DotRating label={t('dexterity')} value={form.dexterity} onChange={v => update("dexterity", v)} />
            <DotRating label={t('stamina')} value={form.stamina} onChange={v => update("stamina", v)} />
            </div>
            <div>
            <DotRating label={t('charisma')} value={form.charisma} onChange={v => update("charisma", v)} />
            <DotRating label={t('manipulation')} value={form.manipulation} onChange={v => update("manipulation", v)} />
            <DotRating label={t('appearance')} value={form.appearance} onChange={v => update("appearance", v)} />
            </div>
            <div>
            <DotRating label={t('perception')} value={form.perception} onChange={v => update("perception", v)} />
            <DotRating label={t('intelligence')} value={form.intelligence} onChange={v => update("intelligence", v)} />
            <DotRating label={t('wits')} value={form.wits} onChange={v => update("wits", v)} />
            </div>
          </div>
        )}
      </fieldset>

      {/* Talentos, Habilidades e Conhecimentos */}
      <fieldset className="mt-6">
      <div className="text-lg font-semibold mb-2 flex justify-center items-center gap-2">
          <h3 className="font-medium mb-2">{t('perks')}  </h3>
          <button type="button" className="text-sm text-blue-600" onClick={() => {setShowTalentos(v => !v), setShowConhecimentos(v => !v), setShowHabilidades(v => !v)}}>
          {showTalentos || showHabilidades || showConhecimentos ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {/* Talentos */}
          <div>
            <div className="flex justify-center items-center mb-2 gap-2">
            <h3 className="font-medium mb-2">{t('talent')} </h3>
            <button type="button" className="text-sm text-blue-600" onClick={() => setShowTalentos(v => !v)}>
              {showTalentos ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            </div>
            {showTalentos && (
              <div>
              <DotRating label={t('alertness')} value={form.alertness} onChange={v => update("alertness", v)} maxValue={5} />
              <DotRating label={t('athletics')} value={form.athletics} onChange={v => update("athletics", v)} maxValue={5} />
              <DotRating label={t('awareness')} value={form.awareness} onChange={v => update("awareness", v)} maxValue={5} />
              <DotRating label={t('brawl')} value={form.brawl} onChange={v => update("brawl", v)} maxValue={5} />
              <DotRating label={t('empathy')} value={form.empathy} onChange={v => update("empathy", v)} maxValue={5} />
              <DotRating label={t('expression')} value={form.expression} onChange={v => update("expression", v)} maxValue={5} />
              <DotRating label={t('intimidation')} value={form.intimidation} onChange={v => update("intimidation", v)} maxValue={5} />
              <DotRating label={t('leadership')} value={form.leadership} onChange={v => update("leadership", v)} maxValue={5} />
              <DotRating label={t('streetwise')} value={form.streetwise} onChange={v => update("streetwise", v)} maxValue={5} />
              <DotRating label={t('subterfuge')} value={form.subterfuge} onChange={v => update("subterfuge", v)} maxValue={5} />
              </div>
            )}
          </div>
          {/* Habilidades */}
          <div>
            <div className="flex justify-center items-center mb-2 gap-2">
              <h3 className="font-medium mb-2">{t('skill')} </h3>
              <button type="button" className="text-sm text-blue-600" onClick={() => setShowHabilidades(v => !v)}>
                  {showHabilidades ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
            {showHabilidades && (
              <div>
              <DotRating label={t('animal_kin')} value={form.animal_kin} onChange={v => update("animal_kin", v)} maxValue={5} />
              <DotRating label={t('archery')} value={form.archery} onChange={v => update("archery", v)} maxValue={5} />
              <DotRating label={t('crafts')} value={form.crafts} onChange={v => update("crafts", v)} maxValue={5} />
              <DotRating label={t('etiquette')} value={form.etiquette} onChange={v => update("etiquette", v)} maxValue={5} />
              <DotRating label={t('legerdemain')} value={form.legerdemain} onChange={v => update("legerdemain", v)} maxValue={5} />
              <DotRating label={t('melee')} value={form.melee} onChange={v => update("melee", v)} maxValue={5} />
              <DotRating label={t('performance')} value={form.performance} onChange={v => update("performance", v)} maxValue={5} />
              <DotRating label={t('ride')} value={form.ride} onChange={v => update("ride", v)} maxValue={5} />
              <DotRating label={t('stealth')} value={form.stealth} onChange={v => update("stealth", v)} maxValue={5} />
              <DotRating label={t('survival')} value={form.survival} onChange={v => update("survival", v)} maxValue={5} />
              </div>
            )}

          </div>
          {/* Conhecimentos */}
          <div>
            <div className="flex justify-center items-center mb-2 gap-2">
              <h3 className="font-medium mb-2">{t('knowledge')}</h3>
              <button type="button" className="text-sm text-blue-600" onClick={() => setShowConhecimentos(v => !v)}>
                {showConhecimentos ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button> 
            </div>
            {showConhecimentos && (
            <div>
              <DotRating label={t('academics')} value={form.academics} onChange={v => update("academics", v)} maxValue={5} />
              <DotRating label={t('enigmas')} value={form.enigmas} onChange={v => update("enigmas", v)} maxValue={5} />
              <DotRating label={t('heart_wisdom')} value={form.heart_wisdom} onChange={v => update("heart_wisdom", v)} maxValue={5} />
              <DotRating label={t('investigation')} value={form.investigation} onChange={v => update("investigation", v)} maxValue={5} />
              <DotRating label={t('law')} value={form.law} onChange={v => update("law", v)} maxValue={5} />
              <DotRating label={t('medicine')} value={form.medicine} onChange={v => update("medicine", v)} maxValue={5} />
              <DotRating label={t('occult')} value={form.occult} onChange={v => update("occult", v)} maxValue={5} />
              <DotRating label={t('politics')} value={form.politics} onChange={v => update("politics", v)} maxValue={5} />
              <DotRating label={t('seneschal')} value={form.seneschal} onChange={v => update("seneschal", v)} maxValue={5} />
              <DotRating label={t('theology')} value={form.theology} onChange={v => update("theology", v)} maxValue={5} />
            </div>
            )}
          </div>
        </div>
      </fieldset>

      {/* Disciplinas do Clã */}
      <fieldset className="mt-6">
        <legend className="text-lg font-semibold mb-2 text-center">{t('clan_disciplines')}</legend>
        <div className="grid grid-cols-3 gap-4">
          {selectedClan !== null && (
        <>
          <DotRating label={selectedClan.discipline1} value={form.clanDiscipline1} onChange={v => update("clanDiscipline1", v)} />
          <DotRating label={selectedClan.discipline2} value={form.clanDiscipline2} onChange={v => update("clanDiscipline2", v)} />
          <DotRating label={selectedClan.discipline3} value={form.clanDiscipline3} onChange={v => update("clanDiscipline3", v)} />
        </>
          )}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="text-lg font-semibold mb-2 text-center">{t('extra_disciplines')}</legend>
        <div className="grid grid-cols-2 gap-4 ">
          {form.disciplines.map((d, i) => (
            <div key={i} className="flex gap-4 mb-2">
              <input className="border p-2 rounded bg-white flex-1" placeholder={t('discipline')} value={d.name} onChange={e => updateDisciplina(i, "name", e.target.value as unknown as number)} />
              <DotRating value={d.score} onChange={v => updateDisciplina(i, "score", v)} />
              <button type="button" onClick={() => removeDisciplina(i)} className="text-red-500"><Trash size={16} /></button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addDisciplina} className="mt-2 text-blue-600 flex items-center gap-2"><Plus size={16} /> {t('discipline')}</button>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="text-lg font-semibold mb-2 text-center">{t('backgrounds')}</legend>
        <div className="grid grid-cols-2 gap-4 ">
          {form.backgrounds.map((d, i) => (
            <div key={i} className="flex gap-4 mb-2">
              <input className="border p-2 rounded bg-white flex-1" placeholder={t('background')} value={d.name} onChange={e => updateBackground(i, "name", e.target.value as unknown as number)} />
              <DotRating value={d.score} onChange={v => updateBackground(i, "score", v)} maxValue={5}/>
              <button type="button" onClick={() => removeBackground(i)} className="text-red-500"><Trash size={16} /></button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addBackground} className="mt-2 text-blue-600 flex items-center gap-2"><Plus size={16} /> {t('background')}</button>
      </fieldset>

      <fieldset className="mt-6">
        <div className="text-lg font-semibold mb-2 flex justify-center items-center gap-2">
          <h3 className="font-medium mb-2">{t('virtues')} e Outros</h3>
          <button type="button" className="text-sm text-blue-600" onClick={() => setShowExtras(v => !v)}>
          {showExtras ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
        {showExtras && (

        <div className="grid grid-cols-2 gap-4">
          <DotRating label={selectedRoad ? selectedRoad.name + " - " + selectedRoad.pathName : t('road')} value={form.road_value} onChange={v => update("road_value", v)} />
          <DotRating label={t('courage')} value={form.courage} onChange={v => update("courage", v)} maxValue={5} />
          <DotRating label={selectedRoad?.useConscience ? t('conscience') : t('conviction')} value={form.conscience} onChange={v => update("conscience", v)} maxValue={5} />
          <DotRating label={selectedRoad?.useSelf_control ? t('selfControl') : t('instinct')} value={form.self_control} onChange={v => update("self_control", v)} maxValue={5} />
          
          
          <DotRating label={t('willpower')} value={form.willpower} onChange={v => update("willpower", v)} />

          <SquareRating label={t('bloodpool')} value={form.bloodpool} onChange={v => update("bloodpool", v)} maxValue={encontrarLimiteMaximoDeSangue()} />

          <div>
            <label className="block font-medium mb-1">{t('experience')}:</label>
            <input type="number" className="border p-2 rounded w-full" value={form.experience} onChange={e => update("experience", parseInt(e.target.value))} />
          </div>
          <div>
            <label className="block font-medium mb-1">{t('weakness')}: </label>
            <input type="text" className="border p-2 rounded w-full" value={selectedClan?.weakness} disabled />
          </div>

        </div>
        )}
      </fieldset>

      <fieldset className="mt-6">
        <div className="text-lg font-semibold mb-2 flex justify-center items-center gap-2">
          <h3 className="font-medium mb-2">{t('traits')}</h3>
          <button type="button" className="text-sm text-blue-600" onClick={() => setShowTraits(v => !v)}>
          {showExtras ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
        {showTraits && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <legend className="text-lg font-semibold mb-2 text-center">{t('merits')}</legend>
              {form.merits.map((m, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input className="border p-2 rounded bg-white flex-1" placeholder={t('merit')} value={m.name} onChange={e => updateMerit(i, "name", e.target.value as unknown as number)} />
                  <TraitTypeSelect onChange={v => updateMerit(i, "type", v)} value={m.type} />
                  <DotRating value={m.score} onChange={v => updateMerit(i, "score", v)} maxValue={5} />
                  <button type="button" onClick={() => removeMerit(i)} className="text-red-500 font-bold"><Trash size={16} /></button>
                </div>
              ))}
              <button type="button" onClick={addMerit} className="mt-2 text-blue-600 flex items-center gap-2"><Plus size={16} /> {t('merit')}</button>
            </div>
            <div>
              <legend className="text-lg font-semibold mb-2 text-center">{t('flaws')}</legend>
              {form.flaws.map((f, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input className="border p-2 rounded bg-white flex-1" placeholder={t('flaw')} value={f.name} onChange={e => updateFlaw(i, "name", e.target.value as unknown as number)} />
                  <TraitTypeSelect onChange={v => updateFlaw(i, "type", v)} value={f.type} />
                  <DotRating value={f.score} onChange={v => updateFlaw(i, "score", v)} maxValue={5} />
                  <button type="button" onClick={() => removeFlaw(i)} className="text-red-500 font-bold"><Trash size={16} /></button>
                </div>
              ))}
              <button type="button" onClick={addFlaw} className="mt-2 text-blue-600 flex items-center gap-2"><Plus size={16} /> {t('flaw')}</button>
            </div>
          </div>
        )}
      </fieldset>

      <div className="mt-6">
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 flex justify-center items-center gap-2">
          <Save size={20} />
          {t('saveCharacter')}
        </button>
      </div>
    </form>

  );
}
