import { useState, useEffect, useRef } from "react";

interface AutoCompleteSelectProps<T> {
  label: string;
  options: T[];
  getLabel: (item: T) => string;
  getTooltip?: (item: T) => string;
  value: number | null;
  onChange: (selected: T | null) => void;
}

export default function AutoCompleteSelect<T extends { id: number }>({
  label,
  options,
  getLabel,
  getTooltip,
  value,
  onChange,
}: AutoCompleteSelectProps<T>) {
  const [inputValue, setInputValue] = useState("");
  const [filtered, setFiltered] = useState<T[]>(options);
  const [showList, setShowList] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFiltered(
      options.filter((item) =>
        getLabel(item).toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, options]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowList(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mb-4" ref={wrapperRef}>
      <label className="block font-medium mb-1">{label}</label>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setShowList(true)}
        className="border p-2 w-full rounded bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Digite para filtrar..."
      />
      {showList && (
        <ul className="border bg-white mt-1 max-h-48 overflow-auto rounded shadow text-sm">
          {filtered.map((item) => (
            <li
              key={item.id}
              className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => {
                onChange(item);
                setInputValue(getLabel(item));
                setShowList(false);
              }}
              title={getTooltip ? getTooltip(item) : ""}
            >
              {getLabel(item)}
            </li>
          ))}
          {filtered.length === 0 && <li className="px-3 py-2 text-gray-400">Nenhuma opção encontrada</li>}
        </ul>
      )}
    </div>
  );
}
