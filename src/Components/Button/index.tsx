import { FC, ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { VariantProps } from "class-variance-authority";

import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "text-white rounded-lg py-2 px-2 md:px-4 flex items-center justify-center uppercase font-bold disabled:bg-opacity-50 disabled:text-opacity-50 disabled:pointer-events-none",
  {
    variants: {
      intent: {
        main: "text-white rounded-lg bg-black-medium hover:bg-black-dark active:bg-black-dark py-2 px-2 md:px-4 flex items-center justify-center disabled:text-white uppercase font-bold",
        primary: "bg-purple-medium hover:bg-purple-600 active:bg-purple-600 ",
        secondary: "bg-blue-dark hover:bg-[#131921] active:bg-[#131921]",
      },
      size: {
        regular: "text-lg md:text-xl",
        small: "text-md md:text-lg",
      },
    },
    defaultVariants: {
      intent: "main",
      size: "regular",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button: FC<ButtonProps> = ({
  className,
  children,
  size,
  intent,
  ...props
}) => {
  return (
    <button
      className={twMerge(buttonVariants({ size, intent }), className)}
      {...props}
    >
      {children}
    </button>
  );
};
