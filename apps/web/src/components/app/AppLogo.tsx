import { TbSquareLetterTFilled } from "react-icons/tb";

export default function AppLogo() {
    return (
        <div className="flex items-center justify-center gap-x-2 cursor-pointer group">
            <TbSquareLetterTFilled size={24} className="group-hover:-translate-x-1 transition-transform ease-in" />
            <span className="text-xl text-neutral-900 dark:text-light-base font-medium">Triangulum</span>
        </div>
    )
}