import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { RoutineExibition } from "../types/routine";
import { CalendarCog, Trash } from "lucide-react";
import { deleteRoutine } from "../services/routineService";
import { useNavigate } from "react-router-dom";

interface RoutineTableProps {
  routines: RoutineExibition[];
  view: "character" | "place";
  label: string; // saber se está agrupando por personagem ou local
}

const weekdays = [
  { value: 1, label: "sunday" },
  { value: 2, label: "monday" },
  { value: 3, label: "tuesday" },
  { value: 4, label: "wednesday" },
  { value: 5, label: "thursday" },
  { value: 6, label: "friday" },
  { value: 7, label: "saturday" },
];

export function RoutineTable({ routines, view, label }: RoutineTableProps) {
  const { t } = useTranslation("routine");
  const [dayFilter, setDayFilter] = useState<number | null>(null);
  const navigate = useNavigate();

  const filteredRoutines = useMemo(() => {
    let result = [...routines];
    if (dayFilter) result = result.filter(r => r.weekday === dayFilter);
    return result.sort((a, b) => {
      if (a.placeId !== b.placeId) {
        return a.placeId! - b.placeId!;
      }
      if (a.weekday !== b.weekday) {
        return a.weekday - b.weekday;
      }
      return a.startTime.localeCompare(b.startTime);
    });
  }, [routines, dayFilter]);

  const removeRoutine = (id: number) => {
    if (!window.confirm(t("deleteRoutineConfirm"))){
      return;
    }
    deleteRoutine(id)
      .then(() => alert(t("deleteRoutineSuccess")))
      .catch(() => alert(t("deleteRoutineError")));
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center gap-2">
        <label className="font-semibold">{t('filterByDay')}</label>
        <select
          value={dayFilter ?? ""}
          onChange={(e) => setDayFilter(e.target.value ? Number(e.target.value) : null)}
          className="border p-2 rounded"
        >
          <option value="">{t('allDays')}</option>
          {weekdays.map((day) => (
            <option key={day.value} value={day.value}>
              {t(day.label)}
            </option>
          ))}
        </select>
      </div>
      <h3 className="font-semibold mb-4">{label}</h3>
      <table className="min-w-full border border-gray-300 rounded shadow text-sm">
        <thead className="bg-gray-100">
          <tr>
            {view === "character" && <th className="px-3 py-2 text-left">{t('place')}</th>}
            {view === "place" && <th className="px-3 py-2 text-left">{t('character')}</th>}
            <th className="px-3 py-2 text-left">{t('day')}</th>
            <th className="px-3 py-2 text-left">{t('start')}</th>
            <th className="px-3 py-2 text-left">{t('end')}</th>
            <th className="px-3 py-2 text-left">{t('description')}</th>
            <th className="px-3 py-2 text-left">{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {filteredRoutines.map((routine) => (
            <tr key={routine.id} className="border-t">
              {view === "character" && <td className="px-3 py-2">{routine.placeName}</td>}
              {view === "place" && <td className="px-3 py-2">{routine.characterName}</td>}
              <td className="px-3 py-2">{t(weekdays.find(d => d.value === routine.weekday)?.label || '')}</td>
              <td className="px-3 py-2">{routine.startTime}</td>
              <td className="px-3 py-2">{routine.endTime}</td>
              <td className="px-3 py-2">{routine.description}</td>
              <td className="px-3 py-2">
                <div className="flex items-center gap-2">
                <button onClick={() => navigate(`/editRoutine/${routine.id}`)} className="bg-blue-500 hover:bg-blue-600 text-white rounded">
                  <CalendarCog className="h-5 w-5" />
                </button>
                <button onClick={() => removeRoutine(routine.id!)} className="bg-red-500 hover:bg-red-600 text-white rounded">
                  <Trash className="h-5 w-5" />
                </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
