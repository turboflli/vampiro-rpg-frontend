import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
    part: string;
    options: string[];
    onChange: (value: string) => void;
    acceptUndefined?: boolean;
    value?: string;
}

export default function AvatarPartSelect({ part, options, onChange, acceptUndefined, value }: Props) {

    const optionFoward = () => {
        if (!value) {
            onChange(options[0]);
            return;
        }
        const index = options.indexOf(value);
        if (index == options.length - 1 ) {
            if (acceptUndefined) {
                onChange("");
            } else {
                onChange(options[0]);
            }
        } else {
            onChange(options[(index + 1)]);
        }
    }

    const optionBack = () => {
        if (!value) {
            onChange(options[options.length - 1]);
            return;
        }
        const index = options.indexOf(value);
        if (index == 0) {
            if (acceptUndefined) {
                onChange("");
            } else {
                onChange(options[options.length - 1]);
            }
        } else {
            onChange(options[(index - 1)]);
        }
    }

    return (
        <div className="flex items-center space-x-2">
            <button onClick={optionBack}><ChevronLeft className="w-5 h-5" /></button>
            <label className="block font-semibold">{part}</label>
            <button onClick={optionFoward}><ChevronRight className="w-5 h-5" /></button>
        </div>
    );
}