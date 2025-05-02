type Props = {
    value: number;
    maxValue: number;
    onChange: (v: number) => void;
    label?: string;
    filledClass: string;
    emptyClass: string;
    shape: string;
    wrapperClassName?: string;
  };


    export default function Rating({ value, maxValue, onChange, label, filledClass, emptyClass, shape, wrapperClassName }: Props) {

    const handlenClick = (newValue: number) => {
        if (newValue == value) {
            onChange(newValue - 1);
        } else {
            onChange(newValue);
        }
    }

    return (
        <div className="flex items-center mb-1 border border-gray-300 rounded-md p-2 shadow-sm">
        { label && (
            <label className="block font-medium mb-1 w-48">{label} :</label>
        )}
            <div className={`${wrapperClassName} gap-1`}>
            {Array.from({ length: maxValue }, (_, i) => {
                return (
                    <button
                        key={i}
                        onClick={() => handlenClick(i + 1)}
                        className={`w-5 h-5 border cursor-pointer transition-colors duration-200 ${shape} ${
                            i < value ? filledClass : emptyClass
                          } `}
                        type="button"
                    />
                );
            })}
            </div>
        </div>
    );
    }
