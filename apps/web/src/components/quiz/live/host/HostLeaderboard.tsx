import LeaderboardPanelComponent, { Player } from '../common/LeaderboardPanelComponent';

export default function HostLeaderboardPanel() {
    const players: Player[] = [
        {
            imageUrl: 'https://dejbzabt9zak1.cloudfront.net/avatars/avatar-1.jpg',
            name: 'Piyush',
            rank: 1,
            score: 100,
        },
        {
            imageUrl: 'https://dejbzabt9zak1.cloudfront.net/avatars/avatar-2.jpg',
            name: 'Piyush',
            rank: 2,
            score: 90,
        },
        {
            imageUrl: 'https://dejbzabt9zak1.cloudfront.net/avatars/avatar-3.jpg',
            name: 'Piyush',
            rank: 3,
            score: 80,
        },
        {
            imageUrl: 'https://dejbzabt9zak1.cloudfront.net/avatars/avatar-4.jpg',
            name: 'Piyush',
            rank: 4,
            score: 70,
        },
        {
            imageUrl: 'https://dejbzabt9zak1.cloudfront.net/avatars/avatar-5.jpg',
            name: 'Piyush',
            rank: 5,
            score: 65,
        },
    ];

    return <LeaderboardPanelComponent players={players} />;
}
