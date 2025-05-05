type Props = {
    onChange: (v: string) => void;
    value?: string;
}

export default function TraitTypeSelect({ onChange, value }: Props) {
    return (
        <div className="flex items-center mb-1 border border-gray-300 rounded-md p-2 shadow-sm">
          <select  onChange={(e) => onChange(e.target.value)} value={value}>
            <option value="">--Selecione--</option>
            <option value="Fisico">Físico</option>
            <option value="Mental">Mental</option>
            <option value="Social">Social</option>
            <option value="Sobrenatural">Sobrenatural</option>
          </select>
        </div>
      );
}