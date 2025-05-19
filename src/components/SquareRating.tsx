import Rating from './Rating';

type Props = {
    value: number;
    maxValue: number;
    onChange: (v: number) => void;
    label?: string;
};

export default function SquareRating({ value, maxValue, onChange, label }: Props) {
    return (
        <Rating
            value={value}
            maxValue={maxValue}
            onChange={onChange}
            label={label}
            filledClass="bg-red-600 hover:border-red-600"
            emptyClass="bg-gray-200 hover:bg-red-300 hover:border-red-600"
            shape="rounded-none"
            wrapperClassName="grid grid-cols-10"
        />
    );
}
