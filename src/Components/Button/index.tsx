import { FC, ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
  const baseClasses =
    "text-white rounded-lg py-2 px-2 md:px-4 flex items-center justify-center uppercase font-bold disabled:bg-opacity-50 disabled:text-opacity-50 disabled:pointer-events-none";

  const primaryClasses =
    "bg-purple-medium hover:bg-purple-600 active:bg-purple-600";

  return (
    <button
      className={twMerge(baseClasses, primaryClasses, className)}
      {...props}
    >
      {children}
    </button>
  );
};
