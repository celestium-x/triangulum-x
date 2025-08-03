import React, { JSX } from 'react';
import { User } from '../specTypes';
import { BiExpandAlt } from 'react-icons/bi';
import ToolTipComponent from '@/components/utility/TooltipComponent';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ChatHeaderProps {
    user: User;
    onToggleExpand: () => void;
}

export default function SpectatorChatHeader({
    user,
    onToggleExpand,
}: ChatHeaderProps): JSX.Element {
    return (
        <div className="relative px-7 py-4 border-b">
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start gap-x-3">
                    <div>
                        {user.avatar ? (
                            <Image
                                src={user.avatar}
                                alt={`${name}'s avatar`}
                                width={50}
                                height={50}
                                className="object-cover rounded-full"
                                unoptimized
                            />
                        ) : (
                            <span>{user.svg}</span>
                        )}
                    </div>
                    <div
                        className={cn(
                            'text-[14px] tracking-wide font-light',
                            'text-dark-base dark:text-light-base',
                        )}
                    >
                        {user.name}
                    </div>
                </div>
                <div>
                    <ToolTipComponent content="Click to expand">
                        <div>
                            <Button
                                className="text-dark-base dark:text-dark-base cursor-pointer dark:bg-neutral-600/30 "
                                variant={'ghost'}
                                onClick={onToggleExpand}
                            >
                                <BiExpandAlt className="dark:text-light-base" strokeWidth={0.5} />
                            </Button>
                        </div>
                    </ToolTipComponent>
                </div>
            </div>
        </div>
    );
}

{
    /* <div className="flex items-center justify-between">
    <div className="flex items-center space-x-4">
        <div
            className={cn(
                'w-auto h-auto rounded-full relative',
                'flex items-center justify-center',
                'text-3xl text-light-base dark:text-dark-base ',
                'transform transition-all duration-200',
                'overflow-hidden',
            )}
        >
            {user.avatar ? (
                <Image
                    src={user.avatar}
                    alt={`${name}'s avatar`}
                    width={50}
                    height={50}
                    className="object-cover rounded-full"
                    unoptimized
                />
            ) : (
                <span>{user.svg}</span>
            )}
        </div>
        <div
            className={cn(
                'ml-2 text-md tracking-wide',
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
</div> */
}
