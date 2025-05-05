import { useState, useEffect } from "react";
import { getAllClans, getAllRoads, createCharacter, getCharacter } from "../services/characterService";
import { initialCharacter } from "../types/initialCharacter";
import type { Backgrounds, Clan, Discipline, Flaws, Merits, Road } from "../types/character";
import DotRating from "./DotRating";
import AutoCompleteSelect from "./AutoCompleteSelect";
import { ChevronDown, ChevronUp, Trash, Plus, Undo2 } from 'lucide-react';
import SquareRating from "./SquareRating";
import TraitTypeSelect from "./TraitTypeSelect";
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

interface Props {
    id?: number;
}

export default function CreateCharacterForm({ id }: Props) {

    const navigate = useNavigate();

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
    const [showExtras, setShowExtras] = useState(true);
    const [showTraits, setShowTraits] = useState(true);

  useEffect(() => {
    // Load clans and roads first
    getAllClans()
      .then(data => setClans(data))
      .catch(() => alert("Erro ao buscar clãs"));
    getAllRoads()
      .then(data => setRoads(data))
      .catch(() => alert("Erro ao buscar roads"));
  }, []);

  // Handle character loading when id changes
  useEffect(() => {
    if (id) {
      getCharacter(Number(id))
        .then(data => {
          setForm(data);
          // Update selected clan and road after form is set
          setSelectedClan(clans.find(clan => clan.id === data.clanId) || null);
          setSelectedRoad(roads.find(road => road.id === data.roadId) || null);
        })
        .catch(() => alert("Erro ao buscar personagem"));
    }
  }, [id, clans, roads]);

  // Update weakness when selectedClan changes
  useEffect(() => {
    if (selectedClan) {
      setForm(prev => ({ ...prev, weakness: selectedClan.weakness }));
    }
  }, [selectedClan]);

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

  const addBackground = () => {
    setForm(prev => ({
      ...prev,
      backgrounds: [...prev.backgrounds, { name: "", score: 0 }]
    }));
  }

  const updateBackground = (i: number, field: keyof Backgrounds, value: number) => {
    const copy = [...form.backgrounds];
    (copy[i][field] as any) = value;
    setForm(prev => ({ ...prev, backgrounds: copy }));
  };

  const removeBackground = (i: number) => {
    const copy = [...form.backgrounds];
    copy.splice(i, 1);
    setForm(prev => ({ ...prev, backgrounds: copy }));
  };
  const addFlaw = () => {
    setForm(prev => ({
      ...prev,
      flaws: [...prev.flaws, { name: "", type: "", score: 0 }]
    }));
  }

  const updateFlaw = (i: number, field: keyof Flaws, value: string | number) => {
      const copy = [...form.flaws];
      (copy[i][field] as any) = value;
      setForm(prev => ({ ...prev, flaws: copy }));
    };

  const removeFlaw = (i: number) => {
    const copy = [...form.flaws];
    copy.splice(i, 1);
    setForm(prev => ({ ...prev, flaws: copy }));
  };

  const addMerit = () => {
    setForm(prev => ({
      ...prev,
      merits: [...prev.merits, { name: "", type: "", score: 0 }]
    }));
  }

  const updateMerit = (i: number, field: keyof Merits, value: string | number) => {
    const copy = [...form.merits];
    (copy[i][field] as any) = value;
    setForm(prev => ({ ...prev, merits: copy }));
  };

  const removeMerit = (i: number) => {
    const copy = [...form.merits];
    copy.splice(i, 1);
    setForm(prev => ({ ...prev, merits: copy }));
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
    navigate("/");
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

<form onSubmit={handleSubmit} className="max-w-6xl w-full p-6 bg-white shadow-2xl rounded-lg text-black ">
      <Link to="/" className="flex items-center text-blue-600 hover:underline">
        <Undo2 className="h-5 w-5 mr-2" />
        Voltar
      </Link>
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
          {showAtributos ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
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
          {showTalentos || showHabilidades || showConhecimentos ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {/* Talentos */}
          <div>
            <div className="flex justify-center items-center mb-2 gap-2">
            <h3 className="font-medium mb-2">Talentos </h3>
            <button type="button" className="text-sm text-blue-600" onClick={() => setShowTalentos(v => !v)}>
              {showTalentos ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            </div>
            {showTalentos && (
              <div>
              <DotRating label="Prontidão" value={form.alertness} onChange={v => update("alertness", v)} maxValue={5} />
              <DotRating label="Esportes" value={form.athletics} onChange={v => update("athletics", v)} maxValue={5} />
              <DotRating label="Atençaõ" value={form.awareness} onChange={v => update("awareness", v)} maxValue={5} />
              <DotRating label="Briga" value={form.brawl} onChange={v => update("brawl", v)} maxValue={5} />
              <DotRating label="Empatia" value={form.empathy} onChange={v => update("empathy", v)} maxValue={5} />
              <DotRating label="Expressão" value={form.expression} onChange={v => update("expression", v)} maxValue={5} />
              <DotRating label="Intimidação" value={form.intimidation} onChange={v => update("intimidation", v)} maxValue={5} />
              <DotRating label="Liderança" value={form.leadership} onChange={v => update("leadership", v)} maxValue={5} />
              <DotRating label="Crime" value={form.streetwise} onChange={v => update("streetwise", v)} maxValue={5} />
              <DotRating label="Lábia" value={form.subterfuge} onChange={v => update("subterfuge", v)} maxValue={5} />
              </div>
            )}
          </div>
          {/* Habilidades */}
          <div>
            <div className="flex justify-center items-center mb-2 gap-2">
              <h3 className="font-medium mb-2 gap-4">Habilidades </h3>
              <button type="button" className="text-sm text-blue-600" onClick={() => setShowHabilidades(v => !v)}>
                  {showHabilidades ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
            {showHabilidades && (
              <div>
              <DotRating label="Empatia com Animais" value={form.animal_kin} onChange={v => update("animal_kin", v)} maxValue={5} />
              <DotRating label="Arquerismo" value={form.archery} onChange={v => update("archery", v)} maxValue={5} />
              <DotRating label="Artesanato" value={form.crafts} onChange={v => update("crafts", v)} maxValue={5} />
              <DotRating label="Etiqueta" value={form.etiquette} onChange={v => update("etiquette", v)} maxValue={5} />
              <DotRating label="Prestidigitação" value={form.legerdemain} onChange={v => update("legerdemain", v)} maxValue={5} />
              <DotRating label="Armas Brancas" value={form.melee} onChange={v => update("melee", v)} maxValue={5} />
              <DotRating label="Performance" value={form.performance} onChange={v => update("performance", v)} maxValue={5} />
              <DotRating label="Cavalgar" value={form.ride} onChange={v => update("ride", v)} maxValue={5} />
              <DotRating label="Furtividade" value={form.stealth} onChange={v => update("stealth", v)} maxValue={5} />
              <DotRating label="Sobrevivência" value={form.survival} onChange={v => update("survival", v)} maxValue={5} />
              </div>
            )}

          </div>
          {/* Conhecimentos */}
          <div>
            <div className="flex justify-center items-center mb-2 gap-2">
              <h3 className="font-medium mb-2">Conhecimentos</h3>
              <button type="button" className="text-sm text-blue-600" onClick={() => setShowConhecimentos(v => !v)}>
                {showConhecimentos ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button> 
            </div>
            {showConhecimentos && (
            <div>
              <DotRating label="Instrução" value={form.academics} onChange={v => update("academics", v)} maxValue={5} />
              <DotRating label="Enigmas" value={form.enigmas} onChange={v => update("enigmas", v)} maxValue={5} />
              <DotRating label="Sabedoria popular" value={form.heart_wisdom} onChange={v => update("heart_wisdom", v)} maxValue={5} />
              <DotRating label="Investigação" value={form.investigation} onChange={v => update("investigation", v)} maxValue={5} />
              <DotRating label="Direito" value={form.law} onChange={v => update("law", v)} maxValue={5} />
              <DotRating label="Medicina" value={form.medicine} onChange={v => update("medicine", v)} maxValue={5} />
              <DotRating label="Ocultismo" value={form.occult} onChange={v => update("occult", v)} maxValue={5} />
              <DotRating label="Política" value={form.politics} onChange={v => update("politics", v)} maxValue={5} />
              <DotRating label="Senescalia" value={form.seneschal} onChange={v => update("seneschal", v)} maxValue={5} />
              <DotRating label="Ciência" value={form.theology} onChange={v => update("theology", v)} maxValue={5} />
            </div>
            )}
          </div>
        </div>
      </fieldset>

      {/* Disciplinas do Clã */}
      <fieldset className="mt-6">
        <legend className="text-lg font-semibold mb-2 text-center">Disciplinas do Clã</legend>
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
        <legend className="text-lg font-semibold mb-2 text-center">Disciplinas Extras</legend>
        <div className="grid grid-cols-2 gap-4 ">
          {form.disciplines.map((d, i) => (
            <div key={i} className="flex gap-4 mb-2">
              <input className="border p-2 rounded bg-white flex-1" placeholder="Nome da disciplina" value={d.name} onChange={e => updateDisciplina(i, "name", e.target.value as unknown as number)} />
              <DotRating value={d.score} onChange={v => updateDisciplina(i, "score", v)} />
              <button type="button" onClick={() => removeDisciplina(i)} className="text-red-500"><Trash size={16} /></button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addDisciplina} className="mt-2 text-blue-600"><Plus size={16} /> Disciplina</button>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="text-lg font-semibold mb-2 text-center">Antecedentes</legend>
        <div className="grid grid-cols-2 gap-4 ">
          {form.backgrounds.map((d, i) => (
            <div key={i} className="flex gap-4 mb-2">
              <input className="border p-2 rounded bg-white flex-1" placeholder="Nome do antecedente" value={d.name} onChange={e => updateBackground(i, "name", e.target.value as unknown as number)} />
              <DotRating value={d.score} onChange={v => updateBackground(i, "score", v)} maxValue={5}/>
              <button type="button" onClick={() => removeBackground(i)} className="text-red-500"><Trash size={16} /></button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addBackground} className="mt-2 text-blue-600"><Plus size={16} /> Antecedente</button>
      </fieldset>

      <fieldset className="mt-6">
        <div className="text-lg font-semibold mb-2 flex justify-center items-center gap-2">
          <h3 className="font-medium mb-2">Virtudes e Outros</h3>
          <button type="button" className="text-sm text-blue-600" onClick={() => setShowExtras(v => !v)}>
          {showExtras ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
        {showExtras && (

        <div className="grid grid-cols-2 gap-4">
          <DotRating label={selectedRoad ? selectedRoad.name + " - " + selectedRoad.pathName : "Caminho"} value={form.road_value} onChange={v => update("road_value", v)} />
          <DotRating label="Coragem" value={form.courage} onChange={v => update("courage", v)} maxValue={5} />
          <DotRating label={selectedRoad?.useConscience ? "Consciência" : "Convicção"} value={form.conscience} onChange={v => update("conscience", v)} maxValue={5} />
          <DotRating label={selectedRoad?.useSelf_control ? "Autocontrole" : "Instinto"} value={form.self_control} onChange={v => update("self_control", v)} maxValue={5} />
          
          
          <DotRating label="Vontade" value={form.willpower} onChange={v => update("willpower", v)} />

          <SquareRating label="Pontos de Sangue" value={form.bloodpool} onChange={v => update("bloodpool", v)} maxValue={encontrarLimiteMaximoDeSangue()} />

          <div>
            <label className="block font-medium mb-1">Experiência:</label>
            <input type="number" className="border p-2 rounded w-full" value={form.experience} onChange={e => update("experience", parseInt(e.target.value))} />
          </div>
          <div>
            <label className="block font-medium mb-1">Fraqueza: </label>
            <input type="text" className="border p-2 rounded w-full" value={selectedClan?.weakness} disabled />
          </div>

        </div>
        )}
      </fieldset>

      <fieldset className="mt-6">
        <div className="text-lg font-semibold mb-2 flex justify-center items-center gap-2">
          <h3 className="font-medium mb-2">Traits</h3>
          <button type="button" className="text-sm text-blue-600" onClick={() => setShowTraits(v => !v)}>
          {showExtras ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
        {showTraits && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <legend className="text-lg font-semibold mb-2 text-center">Méritos</legend>
              {form.merits.map((m, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input className="border p-2 rounded bg-white flex-1" placeholder="Nome do mérito" value={m.name} onChange={e => updateMerit(i, "name", e.target.value as unknown as number)} />
                  <TraitTypeSelect onChange={v => updateMerit(i, "type", v)} value={m.type} />
                  <DotRating value={m.score} onChange={v => updateMerit(i, "score", v)} maxValue={5} />
                  <button type="button" onClick={() => removeMerit(i)} className="text-red-500 font-bold"><Trash size={16} /></button>
                </div>
              ))}
              <button type="button" onClick={addMerit} className="mt-2 text-blue-600"><Plus size={16} /> Mérito</button>
            </div>
            <div>
              <legend className="text-lg font-semibold mb-2 text-center">Defeitos</legend>
              {form.flaws.map((f, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input className="border p-2 rounded bg-white flex-1" placeholder="Nome do defeito" value={f.name} onChange={e => updateFlaw(i, "name", e.target.value as unknown as number)} />
                  <TraitTypeSelect onChange={v => updateFlaw(i, "type", v)} value={f.type} />
                  <DotRating value={f.score} onChange={v => updateFlaw(i, "score", v)} maxValue={5} />
                  <button type="button" onClick={() => removeFlaw(i)} className="text-red-500 font-bold"><Trash size={16} /></button>
                </div>
              ))}
              <button type="button" onClick={addFlaw} className="mt-2 text-blue-600"><Plus size={16} /> Defeito</button>
            </div>
          </div>
        )}
      </fieldset>

      <div className="mt-6">
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">Salvar Personagem</button>
      </div>
    </form>

  );
}
