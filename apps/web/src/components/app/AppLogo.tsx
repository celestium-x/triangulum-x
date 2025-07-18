import Image from "next/image";

export default function AppLogo() {
    return (
        <div className="flex items-center justify-center gap-x-2 cursor-pointer group">
            <Image src={'/images/logo.jpg'} width={40} height={40} alt="logo" unoptimized className="rounded-sm" />
            <span className="text-xl text-neutral-900 dark:text-light-base font-medium">Triangulum</span>
        </div>
    )
}