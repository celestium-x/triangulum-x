import React, { JSX } from 'react';

import { User } from '../specTypes';
import SpectatorHeaderMascot from './SpectatorHeaderMascot';
import SpectatorChunkyButton from './SpectatorChunkyButton';
import { BiExpandAlt } from 'react-icons/bi';
import ToolTipComponent from '@/components/utility/TooltipComponent';

interface ChatHeaderProps {
    user: User;
}

export default function SpectatorChatHeader({ user }: ChatHeaderProps): JSX.Element {
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

                    <div className="ml-2 text-[18px] tracking-wide ">
                        {user.name}
                    </div>

                </div>

                <ToolTipComponent content="click to expand">
                    <div>
                        <SpectatorChunkyButton className="bg-[#e7ab1ed0] text-white" size="md">
                            <BiExpandAlt
                                className='dark:text-neutral-900'
                                strokeWidth={0.8}
                            />
                        </SpectatorChunkyButton>
                    </div>
                </ToolTipComponent>
            </div>
        </div>
    );
};
