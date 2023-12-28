import { cn } from "../../lib/utils";
interface ButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
}
export const Button: React.FC<ButtonProps> = ({ children, onClick, className}) => {
  return (
    <button
      className={cn("flex items-center gap-2 p-6 justify-between h-[60px] w-fit min-w-[210px] cursor-pointer rounded bg-dark border-pink-400 border text-white font-bold transition-all ring-pink-500 hover:bg-stone-900 hover:text-pink-500", className)}
      onClick={onClick}
    >{children}
    </button>
  )
}
