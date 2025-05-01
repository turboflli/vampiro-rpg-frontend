type Props = {
    value: number;
    onChange: (v: number) => void;
    label?: string;
  };

  
  export default function DotRating({ value, onChange, label }: Props) {

    const handlenClick = (newValue: number) => {
        if (newValue == value) {
            onChange(newValue - 1);
        } else {
            onChange(newValue);
        }
    }

    return (
        <div className="flex items-center justify-between mb-1 border border-gray-300 rounded-md p-2 shadow-sm">
        { label && (
            <label className="block font-medium mb-1 w-40">{label} :</label>
        )}
          <div className="flex gap-1">
            {Array.from({ length: 10 }, (_, i) => (
              <button
                key={i}
                onClick={() => handlenClick(i + 1)}
                className={`w-5 h-5 rounded-full border cursor-pointer transition-colors duration-200 ${i < value ? 'bg-blue-600' : 'bg-gray-200 hover:bg-blue-300'}`}
                type="button"
              />
            ))}
          </div>
        </div>
    );
  }
