import Rating from './Rating';

type Props = {
    value: number;
    onChange: (v: number) => void;
    label?: string;
    maxValue?: number; // Optional prop for maxValue
};

export default function DotRating({ value, onChange, label, maxValue }: Props) {
    return (
      <Rating
        value={value}
        maxValue={maxValue ?? 10} // Default value for maxValue
        onChange={onChange}
        label={label}
        filledClass="bg-blue-600"
        emptyClass="bg-gray-200 hover:bg-blue-300"
        shape="rounded-full"
        wrapperClassName="flex"
      />
    );
}
