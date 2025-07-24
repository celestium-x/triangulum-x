import SessionSetter from "@/components/utility/SessionSetter"
import { authOption } from "app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { TooltipProvider } from "@/components/ui/tooltip";

import React from "react"

interface LayoutProps {
    children: React.ReactNode
}

export default async function Layout({ children }: LayoutProps) {
    const session = await getServerSession(authOption);
    return (
        <div>
            <TooltipProvider delayDuration={0}>
                {children}
            </TooltipProvider>
            <SessionSetter session={session} />
        </div>
    )
}