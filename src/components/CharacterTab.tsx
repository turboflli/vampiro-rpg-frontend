import { Link, useParams } from 'react-router-dom';
import CreateCharacterForm from './CreateCharacterForm';
import DiceRollTable from './DiceRollTable';
import AvatarCustomizer from './AvatarCustomizer';
import { useState, useEffect } from "react";
import { getAllClans, getAllRoads, createCharacter, getCharacter, updateCharacter } from "../services/characterService";
import { createAvatar, getAvatar, updateAvatar } from "../services/avatarService";
import { initialCharacter, initialAvatar } from "../types/initials";
import type { Clan, Road } from "../types/character";
import type { Avatar } from "../types/avatar";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom'
import { Undo2 } from 'lucide-react';

export default function CharacterTab() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { id } = useParams();
  const [form, setForm] = useState(initialCharacter);
  const [avatar, setAvatar] = useState<Avatar>(initialAvatar);
  const [selectedClan, setSelectedClan] = useState<Clan | null>(null);
  const [selectedRoad, setSelectedRoad] = useState<Road | null>(null);

  const [clans, setClans] = useState<Clan[]>([]);
  const [roads, setRoads] = useState<Road[]>([]);

  useEffect(() => {
    getAllClans()
      .then(data => setClans(data))
      .catch(() => alert("Erro ao buscar clãs"));
    getAllRoads()
      .then(data => setRoads(data))
      .catch(() => alert("Erro ao buscar roads"));
  }, []);

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
          getAvatar(Number(id))
          .then(data => setAvatar(data))
          .catch(() => alert("Erro ao buscar avatar"));
      }
    }, [id, clans, roads]);

    const saveCharacter = () => {
      if (id) {
        updateCharacter(form)
        .then(() => alert(t('characterUpdated')))
        .catch(() => alert(t('errorUpdatingCharacter')));
        navigate("/");
      } else {
        createCharacterAndAvatar();
      }
    };

    const updateCharacterField = (field: string, value: string | number | null | Array<any>) => {
      setForm(prev => ({ ...prev, [field]: value }));
    };

    const updateAvatarField = (field: string, value: string | undefined) => {
      setAvatar(prev => ({ ...prev, [field]: value }));
    };

    const saveAvatar = () => {
      if (id) {
        updateAvatar(avatar)
        .then(() => alert(t('avatarUpdated')))
        .catch(() => alert(t('errorUpdatingAvatar')));
      } else {
        createCharacterAndAvatar();
      }
    }

    const createCharacterAndAvatar = () => {
      createCharacter(form)
      .then(character => {
        alert(t('characterCreated'));
        if (character.id) {
          const newAvatar = { ...avatar, id: character.id };
          createAvatar(newAvatar)
          .then(() => {
            alert(t('avatarCreated'));
            navigate("/");
          })
          .catch(() => alert(t('errorCreatingAvatar')));
        }
      })
      .catch(() => alert(t('errorCreatingCharacter')));
    }

  return (
    <div>
      <Link to="/" className="flex items-center text-blue-600 hover:underline">
        <Undo2 className="h-5 w-5 mr-2" />
        {t('back')}
      </Link>
      <div className="flex justify-center gap-6 mt-10">
      <AvatarCustomizer avatar={avatar} update={updateAvatarField} saveAvatar={saveAvatar}/>
      <CreateCharacterForm form={form} update={updateCharacterField} roads={roads} clans={clans} selectedClan={selectedClan} setSelectedClan={setSelectedClan} selectedRoad={selectedRoad} setSelectedRoad={setSelectedRoad} saveCharacter={saveCharacter}/>
      <DiceRollTable />
      </div>
    </div>
  );
}
