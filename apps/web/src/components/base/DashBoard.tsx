'use client';
import { JSX, useState } from 'react';
import DashboardLeft from './DashboardLeft';
import DashboardRight from './DashboardRight';

export default function DashBoard(): JSX.Element {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    function handleMouseEnter(): void {
        setIsExpanded(true);
    }

    function handleMouseLeave(): void {
        setIsExpanded(false);
    }

    return (
        <div className="flex h-screen border-t-[1px] border-neutral-300 dark:border-neutral-700">
            <DashboardLeft
                isExpanded={isExpanded}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            <DashboardRight />
        </div>
    );
}
