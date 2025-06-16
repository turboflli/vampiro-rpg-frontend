import { useState } from 'react';
import { Dice1 } from 'lucide-react';
import { useTranslation } from "react-i18next";

interface DiceRoll {
  value: number;
  isSuccess: boolean;
}

export default function DiceRollTable() {
  const { t } = useTranslation();
  const [numberOfDice, setNumberOfDice] = useState(3);
  const [difficulty, setDifficulty] = useState(6);
  const [specialty, setSpecialty] = useState(false);
  const [rolls, setRolls] = useState<DiceRoll[]>([]);

  const rollDice = () => {
    const newRolls = Array.from({ length: numberOfDice }, () => {
      const roll = Math.floor(Math.random() * 10) + 1; // d10 roll (1-10)
      return {
        value: roll,
        isSuccess: roll >= difficulty
      };
    });
    setRolls(newRolls);
  };

  const countResults = () => {
    let successCount = rolls.filter(roll => roll.isSuccess).length;
    const tenCount = rolls.filter(roll => roll.value == 10).length;
    const botchesCount = rolls.filter(roll => roll.value == 1).length;
    if (specialty) {
      successCount = successCount + tenCount;
    }
    successCount = successCount - botchesCount;
    if (successCount > 0) {
      return <label className="text-green-600">{successCount} {t("success")}</label>;
    } else if (botchesCount > 0) {
      return <label className="text-red-600">{botchesCount} {t("botch")}</label>;
    }
    return <label className="text-red-600">{t("failure")}</label>;
  };

  return (
    <div className="w-66 max-h-[500px] overflow-auto bg-white shadow-2xl rounded-lg text-black p-4 self-start">
      <h3 className="text-1xl font-bold mb-4">{t("diceRollTable")}</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("dice")}
          </label>
          <input
            type="number"
            min="1"
            max="15"
            value={numberOfDice}
            data-testid="number-dice-input"
            onChange={(e) => setNumberOfDice(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("difficulty")}
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("specialty")}
          </label>
          <input
            type="checkbox"
            checked={specialty}
            onChange={(e) => setSpecialty(e.target.checked)}
            className="w-5 h-5"
          />
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <button
          onClick={rollDice}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Dice1 className="w-5 h-5 mr-2" />
          Lançar Dados
        </button>
      </div>

      <div className="space-y-4">
        {rolls.length > 0 && (
          <>
          <div className="flex justify-center">
            {countResults()}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {rolls.map((roll, index) => (
              <div
                data-testid="dice-result"
                key={index}
                className={`p-2 text-center rounded-lg ${
                  roll.isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                <span className="text-2xl font-bold">{roll.value}</span>
              </div>
            ))}
          </div>
          </>
        )}
        {rolls.length === 0 && (
          <p className="text-gray-500 text-center">Nenhuma rolagem feita...</p>
        )}
      </div>
      
    </div>
  );
}
