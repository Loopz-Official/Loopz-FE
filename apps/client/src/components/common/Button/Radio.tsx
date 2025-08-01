import { ComponentPropsWithoutRef } from 'react';

type RadioButtonProps = Omit<ComponentPropsWithoutRef<'input'>, 'onChange'> & {
    label: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function RadioButton({
    label,
    className,
    ...props
}: RadioButtonProps) {
    return (
        <label className={className}>
            <input
                type="radio"
                className="border-gray-10 before:-translate-1/2 peer relative m-1 h-4 w-4 appearance-none rounded-full border before:absolute before:left-1/2 before:top-1/2 before:hidden before:h-2.5 before:w-2.5 before:rounded-full before:bg-black checked:border-black checked:before:block"
                {...props}
            />
            {label}
        </label>
    );
}
