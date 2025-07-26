'use client';
import { JSX } from 'react';
import DashboardLeft from './DashboardLeft';
import DashboardRight from './DashboardRight';

export default function DashBoard(): JSX.Element {
    return (
        <div className="flex h-screen border-t-[1px] border-neutral-300 dark:border-neutral-700">
            <DashboardLeft />
            <DashboardRight />
        </div>
    );
}
