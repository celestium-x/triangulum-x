import React, { JSX } from 'react';
import { User } from '../specTypes';
import SpectatorHeaderMascot from './SpectatorHeaderMascot';
import { BiExpandAlt } from 'react-icons/bi';
import ToolTipComponent from '@/components/utility/TooltipComponent';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ChatHeaderProps {
    user: User;
    onToggleExpand: () => void;
}

export default function SpectatorChatHeader({
    user,
    onToggleExpand,
}: ChatHeaderProps): JSX.Element {
    return (
        <div className="relative p-6 border-b">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <SpectatorHeaderMascot
                        name={user.name}
                        isOnline={user.isOnline}
                        avatar={user.avatar}
                        svg={user.svg}
                    />
                    <div
                        className={cn(
                            'ml-2 text-[18px] tracking-wide',
                            'text-dark-base dark:text-light-base',
                        )}
                    >
                        {user.name}
                    </div>
                </div>
                <ToolTipComponent content="Click to expand">
                    <div>
                        <Button
                            className="bg-[#e7ab1e] hover:bg-[#e7ab1e]/90 hover:dark:bg-[#e7ab1e]/90 text-dark-base dark:text-dark-base cursor-pointer"
                            variant={'ghost'}
                            onClick={onToggleExpand}
                        >
                            <BiExpandAlt className="dark:text-neutral-900" strokeWidth={0.8} />
                        </Button>
                    </div>
                </ToolTipComponent>
            </div>
        </div>
    );
}
