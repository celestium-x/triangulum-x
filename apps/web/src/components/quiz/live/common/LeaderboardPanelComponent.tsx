'use client';
import Image from 'next/image';

export interface Player {
    imageUrl: string;
    name: string;
    rank: number;
    score?: number;
}

function LeaderBoardBubble({ player }: { player: Player }) {
    const crownColors: Record<number, string> = {
        1: '#FFD700',
        2: '#C0C0C0',
        3: '#CD7F32',
    };

    const sizeMap: Record<number, string> = {
        1: 'h-20 w-20 border-yellow-500',
        2: 'h-16 w-16 border-zinc-500',
        3: 'h-14 w-14 border-orange-700',
    };

    return (
        <div className="relative flex flex-col justify-center items-center space-y-1 group">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={crownColors[player.rank]}
                className={`absolute -top-5 right-0 ${
                    player.rank === 1 ? 'w-7 h-7' : 'w-6 h-6'
                } rotate-12 drop-shadow-md`}
            >
                <path d="M5 16l-3-9 6 4 4-7 4 7 6-4-3 9H5zm0 2h14v2H5v-2z" />
            </svg>

            <div
                className={`border-4 ${sizeMap[player.rank]} rounded-full overflow-hidden shadow-lg transition-transform`}
            >
                <Image
                    src={player.imageUrl}
                    alt={player.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                    unoptimized
                />
            </div>

            <span
                className={`${
                    player.rank === 1
                        ? 'text-base font-semibold text-zinc-100'
                        : 'text-sm font-medium text-zinc-200'
                }`}
            >
                {player.name.split(' ')[0]}
            </span>

            <span
                className={`${
                    player.rank === 1
                        ? 'text-lg font-bold text-yellow-400 drop-shadow-md'
                        : player.rank === 2
                          ? 'text-md font-semibold text-zinc-400'
                          : 'text-md font-semibold text-orange-500'
                }`}
            >
                #{player.rank}
            </span>
        </div>
    );
}

function LeaderBoardPanel({ player }: { player: Player }) {
    return (
        <div className="w-full h-16 rounded-xl flex overflow-hidden dark:bg-neutral-950 hover:scale-105 transition-all duration-300 ease-in-out">
            <div className="h-full w-[20%] flex justify-center items-center">
                <span className="h-9 w-9 rounded-full border overflow-hidden">
                    <Image
                        src={player.imageUrl}
                        alt={player.name}
                        width={32}
                        height={32}
                        className="object-cover w-full h-full"
                    />
                </span>
            </div>

            <div className="h-full w-[55%] flex justify-start items-center px-3 text-sm dark:text-light-base">
                <span>{player.name}</span>
            </div>

            <div className="h-full w-[25%] flex justify-center items-center">
                <span className="dark:text-light-base font-medium text-[16px]">#{player.rank}</span>
            </div>
        </div>
    );
}

export default function LeaderboardPanelComponent({ players }: { players: Player[] }) {
    const first = players.find((p) => p.rank === 1);
    const second = players.find((p) => p.rank === 2);
    const third = players.find((p) => p.rank === 3);
    const others = players.filter((p) => p.rank > 3);

    return (
        <div className="h-full w-full pt-12 p-6 pb-8 overflow-hidden space-y-3">
            <div className="w-full h-[28%] flex justify-between items-end gap-6">
                <div className="flex-1 flex justify-center items-end">
                    {second && <LeaderBoardBubble player={second} />}
                </div>
                <div className="flex-1 flex justify-center items-end">
                    {first && <LeaderBoardBubble player={first} />}
                </div>
                <div className="flex-1 flex justify-center items-end">
                    {third && <LeaderBoardBubble player={third} />}
                </div>
            </div>

            <div className="w-full h-[72%] rounded-xl p-2 space-y-2 overflow-y-auto custom-scrollbar">
                {others.map((player) => (
                    <LeaderBoardPanel key={player.rank} player={player} />
                ))}
            </div>
        </div>
    );
}
