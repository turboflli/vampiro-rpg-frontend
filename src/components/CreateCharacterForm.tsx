import { useState, useEffect } from "react";
import { getAllClans, getAllRoads, createCharacter } from "../services/characterService";
import { initialCharacter } from "../types/initialCharacter";
import type { Clan, Discipline, Road } from "../types/character";
import DotRating from "./DotRating";
import AutoCompleteSelect from "./AutoCompleteSelect";

export default function CreateCharacterForm() {
    const [form, setForm] = useState(initialCharacter);
    const [clans, setClans] = useState<Clan[]>([]);
    const [roads, setRoads] = useState<Road[]>([]);
    const [selectedClan, setSelectedClan] = useState<Clan | null>(null);
    const [selectedRoad, setSelectedRoad] = useState<Road | null>(null);

    // Colapsáveis
    const [showAtributos, setShowAtributos] = useState(true);
    const [showTalentos, setShowTalentos] = useState(true);
    const [showHabilidades, setShowHabilidades] = useState(true);
    const [showConhecimentos, setShowConhecimentos] = useState(true);

  useEffect(() => {
    getAllClans()
      .then(data => setClans(data))
      .catch(() => alert("Erro ao buscar clãs"));

    getAllRoads()
      .then(data => setRoads(data))
      .catch(() => alert("Erro ao buscar roads"));
  }, []);

  const update = (field: string, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const addDisciplina = () => {
    setForm(prev => ({
      ...prev,
      disciplines: [...prev.disciplines, { name: "", score: 0 }]
    }));
  };

  const updateDisciplina = (i: number, field: keyof Discipline, value: number) => {
    const copy = [...form.disciplines];
    (copy[i][field] as any) = value;
    setForm(prev => ({ ...prev, disciplines: copy }));
  };

  const removeDisciplina = (i: number) => {
    const copy = [...form.disciplines];
    copy.splice(i, 1);
    setForm(prev => ({ ...prev, disciplines: copy }));
  };

  const buildClanTooltip = (clan: Clan) => {
    return clan.discipline1 + "; " + clan.discipline2 +"; " + clan.discipline2 + "; " + clan.weakness
  };

  const buildRoadTooltip = (road: Road) => {
    return (
      "Aura: " + road.aura +
      "\nCrenças: " + road.ethics +
      "\nPecados: " + road.sins +
      "\n" + (road.useConscience ? "Consciência " : "Convicção") +
      " e " + (road.useSelf_control ? "Auto-controle" : "Instinto")
    );
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    createCharacter(form)
    .then(() => alert("Personagem criado com sucesso!"))
    .catch(() => alert("Erro ao criar personagem."));
  };

  return (

<form onSubmit={handleSubmit} className="max-w-7xl mx-auto p-6 bg-white shadow rounded mt-10 text-black">
      <h1 className="text-2xl font-bold text-center mb-6">Criar Personagem</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <input className="border p-2 rounded bg-white" placeholder="Nome" value={form.name} onChange={e => update("name", e.target.value)} required />
        <input className="border p-2 rounded bg-white" placeholder="Conceito" value={form.concept} onChange={e => update("concept", e.target.value)} />
        <input className="border p-2 rounded bg-white" placeholder="Natureza" value={form.nature} onChange={e => update("nature", e.target.value)} />
        <input className="border p-2 rounded bg-white" placeholder="Comportamento" value={form.demeanor} onChange={e => update("demeanor", e.target.value)} />
        <input className="border p-2 rounded bg-white" placeholder="Geração" type="number" min="4" max="15" value={form.generation} onChange={e => update("generation", e.target.value)} />
        <input className="border p-2 rounded bg-white" placeholder="Sire" value={form.sire} onChange={e => update("sire", e.target.value)} />

        <AutoCompleteSelect<Clan>
          label="Clã"
          options={clans}
          value={form.clanId}
          onChange={(clan) => {if (clan) { update("clanId", clan.id); setSelectedClan(clan); }}}
          getLabel={(clan) => clan.name}
          getTooltip={buildClanTooltip}
        />

        <AutoCompleteSelect<Road>
          label="Caminho"
          options={roads}
          value={form.roadId}
          onChange={(road) => {if (road) { update("roadId", road.id); setSelectedRoad(road); }}}
          getLabel={(road) => road.name + " - " + road.pathName}
          getTooltip={buildRoadTooltip}
        />
      </div>

      {/* Atributos */}
      <fieldset className="mt-6 ">
      <div className="text-lg font-semibold mb-2 flex justify-center items-center gap-2">
          <h3 className="font-medium mb-2">Atributos  </h3>
          <button type="button" className="text-sm text-blue-600" onClick={() => setShowAtributos(v => !v)}>
          {showAtributos ? "▲" : "▼"}
          </button>
        </div>
        {showAtributos && (
          <div className="grid grid-cols-3 gap-4">
            <div>
            <DotRating label="Força" value={form.strength} onChange={v => update("strength", v)} />
            <DotRating label="Destreza" value={form.dexterity} onChange={v => update("dexterity", v)} />
            <DotRating label="Vigor" value={form.stamina} onChange={v => update("stamina", v)} />
            </div>
            <div>
            <DotRating label="Carisma" value={form.charisma} onChange={v => update("charisma", v)} />
            <DotRating label="Manipulação" value={form.manipulation} onChange={v => update("manipulation", v)} />
            <DotRating label="Aparência" value={form.appearance} onChange={v => update("appearance", v)} />
            </div>
            <div>
            <DotRating label="Percepção" value={form.perception} onChange={v => update("perception", v)} />
            <DotRating label="Inteligência" value={form.intelligence} onChange={v => update("intelligence", v)} />
            <DotRating label="Raciocínio" value={form.wits} onChange={v => update("wits", v)} />
            </div>
          </div>
        )}
      </fieldset>

      {/* Talentos, Habilidades e Conhecimentos */}
      <fieldset className="mt-6">
      <div className="text-lg font-semibold mb-2 flex justify-center items-center gap-2">
          <h3 className="font-medium mb-2">Perícias  </h3>
          <button type="button" className="text-sm text-blue-600" onClick={() => {setShowTalentos(v => !v), setShowConhecimentos(v => !v), setShowHabilidades(v => !v)}}>
          {showTalentos || showHabilidades || showConhecimentos ? "▲" : "▼"}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {/* Talentos */}
          <div>
            <div className="flex justify-center items-center mb-2 gap-2">
            <h3 className="font-medium mb-2">Talentos </h3>
            <button type="button" className="text-sm text-blue-600" onClick={() => setShowTalentos(v => !v)}>
              {showTalentos ? "▲" : "▼"}
            </button>
            </div>
            {showTalentos && (
              <div>
              <DotRating label="Prontidão" value={form.alertness} onChange={v => update("alertness", v)} />
              <DotRating label="Esportes" value={form.athletics} onChange={v => update("athletics", v)} />
              <DotRating label="Atençaõ" value={form.awareness} onChange={v => update("awareness", v)} />
              <DotRating label="Briga" value={form.brawl} onChange={v => update("brawl", v)} />
              <DotRating label="Empatia" value={form.empathy} onChange={v => update("empathy", v)} />
              <DotRating label="Expressão" value={form.expression} onChange={v => update("expression", v)} />
              <DotRating label="Intimidação" value={form.intimidation} onChange={v => update("intimidation", v)} />
              <DotRating label="Liderança" value={form.leadership} onChange={v => update("leadership", v)} />
              <DotRating label="Crime" value={form.streetwise} onChange={v => update("streetwise", v)} />
              <DotRating label="Lábia" value={form.subterfuge} onChange={v => update("subterfuge", v)} />
              </div>
            )}
          </div>
          {/* Habilidades */}
          <div>
            <div className="flex justify-center items-center mb-2 gap-2">
              <h3 className="font-medium mb-2 gap-4">Habilidades </h3>
              <button type="button" className="text-sm text-blue-600" onClick={() => setShowHabilidades(v => !v)}>
                  {showHabilidades ? "▲" : "▼"}
              </button>
            </div>
            {showHabilidades && (
              <div>
              <DotRating label="Empatia com Animais" value={form.animal_kin} onChange={v => update("animal_kin", v)} />
              <DotRating label="Arquerismo" value={form.archery} onChange={v => update("archery", v)} />
              <DotRating label="Artesanato" value={form.crafts} onChange={v => update("crafts", v)} />
              <DotRating label="Etiqueta" value={form.etiquette} onChange={v => update("etiquette", v)} />
              <DotRating label="Prestidigitação" value={form.legerdemain} onChange={v => update("legerdemain", v)} />
              <DotRating label="Armas Brancas" value={form.melee} onChange={v => update("melee", v)} />
              <DotRating label="Performance" value={form.performance} onChange={v => update("performance", v)} />
              <DotRating label="Cavalgar" value={form.ride} onChange={v => update("ride", v)} />
              <DotRating label="Furtividade" value={form.stealth} onChange={v => update("stealth", v)} />
              <DotRating label="Sobrevivência" value={form.survival} onChange={v => update("survival", v)} />
              </div>
            )}

          </div>
          {/* Conhecimentos */}
          <div>
            <div className="flex justify-center items-center mb-2 gap-2">
              <h3 className="font-medium mb-2">Conhecimentos</h3>
              <button type="button" className="text-sm text-blue-600" onClick={() => setShowConhecimentos(v => !v)}>
                {showConhecimentos ? "▲" : "▼"}
              </button> 
            </div>
            {showConhecimentos && (
            <div>
              <DotRating label="Instrução" value={form.academics} onChange={v => update("academics", v)} />
              <DotRating label="Enigmas" value={form.enigmas} onChange={v => update("enigmas", v)} />
              <DotRating label="Sabedoria popular" value={form.heart_wisdom} onChange={v => update("heart_wisdom", v)} />
              <DotRating label="Investigação" value={form.investigation} onChange={v => update("investigation", v)} />
              <DotRating label="Direito" value={form.law} onChange={v => update("law", v)} />
              <DotRating label="Medicina" value={form.medicine} onChange={v => update("medicine", v)} />
              <DotRating label="Ocultismo" value={form.occult} onChange={v => update("occult", v)} />
              <DotRating label="Política" value={form.politics} onChange={v => update("politics", v)} />
              <DotRating label="Senescalia" value={form.seneschal} onChange={v => update("seneschal", v)} />
              <DotRating label="Ciência" value={form.theology} onChange={v => update("theology", v)} />
            </div>
            )}
          </div>
        </div>
      </fieldset>

      {/* Disciplinas do Clã */}
      <fieldset className="mt-6">
        <legend className="text-lg font-semibold mb-2 text-center">disciplinas do Clã</legend>
        <div className="grid grid-cols-3 gap-4">
          {selectedClan && (
        <>
          <DotRating label={selectedClan.discipline1} value={form.clanDiscipline1} onChange={v => update("clanDiscipline1", v)} />
          <DotRating label={selectedClan.discipline2} value={form.clanDiscipline2} onChange={v => update("clanDiscipline2", v)} />
          <DotRating label={selectedClan.discipline3} value={form.clanDiscipline3} onChange={v => update("clanDiscipline3", v)} />
        </>
          )}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="text-lg font-semibold mb-2">disciplinas Extras</legend>
        {form.disciplines.map((d, i) => (
          <div key={i} className="flex gap-4 mb-2">
            <input className="border p-2 rounded bg-white flex-1" placeholder="Nome da disciplina" value={d.name} onChange={e => updateDisciplina(i, "name", e.target.value as unknown as number)} />
            <DotRating value={d.score} onChange={v => updateDisciplina(i, "score", v)} />
            <button type="button" onClick={() => removeDisciplina(i)} className="text-red-500 font-bold">X</button>
          </div>
        ))}
        <button type="button" onClick={addDisciplina} className="mt-2 text-blue-600">+ Adicionar disciplina</button>
      </fieldset>

      <div className="mt-6">
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">Salvar Personagem</button>
      </div>
    </form>

  );
}
