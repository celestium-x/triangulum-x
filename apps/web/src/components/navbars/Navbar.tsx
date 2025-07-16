import AppLogo from "../app/AppLogo";
import { Button } from "../ui/button";

export default function Navbar() {
    return (
        <div className="absolute top-4 left-1/2 -translate-x-1/2  w-full max-w-5xl px-4 py-4 rounded-lg shadow-lg border">
            <div className="mx-4 flex items-center justify-between">
                <AppLogo />
                <Button className="font-normal tracking-wide bg-dark-base">Sign in</Button>
            </div>
        </div>
    );
}
