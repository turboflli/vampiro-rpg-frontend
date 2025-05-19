import { useParams } from 'react-router-dom';
import CreateCharacterForm from './CreateCharacterForm';
import DiceRollTable from './DiceRollTable';

export default function CharacterTab() {
  const { id } = useParams();

  return (
    <div className="flex justify-center gap-6 mt-10">
      <CreateCharacterForm id={Number(id)} />
      <DiceRollTable />
    </div>
  );
}
