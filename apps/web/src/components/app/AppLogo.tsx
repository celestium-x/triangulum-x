import { TbSquareLetterTFilled } from "react-icons/tb";

export default function AppLogo() {
    return (
        <div className="flex items-center justify-center gap-x-2">
            <TbSquareLetterTFilled size={24} />
            <span className="text-xl text-neutral-900 font-medium">Triangulum</span>
        </div>
    )
}