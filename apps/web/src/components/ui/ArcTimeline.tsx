import ArcTimelineUI, { ArcTimelineItem } from './ArcTimelineUI';
import { FaRocket, FaCube, FaLock, FaGlobe, FaCog, FaBolt, FaStar, FaMagic } from 'react-icons/fa';

export function ArcTimelineDemo() {
    return (
        <ArcTimelineUI
            data={TIMELINE}
            defaultActiveStep={{ time: 'Play to Earn', stepIndex: 0 }}
            arcConfig={{
                circleWidth: 4500,
                angleBetweenMinorSteps: 0.4,
                lineCountFillBetweenSteps: 8,
                boundaryPlaceholderLinesCount: 50,
            }}
        />
    );
}

const TIMELINE: ArcTimelineItem[] = [
    {
        time: 'Game On',
        steps: [
            {
                icon: <FaRocket size={20} />,
                content: `"Stake your knowledge, not just your tokens" – Competitive quizzes with real rewards.`,
            },
            {
                icon: <FaCube size={20} />,
                content:
                    'Multiple elimination rounds that keep you hooked until the last question.',
            },
        ],
    },
    {
        time: 'Secure & Fair',
        steps: [
            {
                icon: <FaLock size={20} />,
                content:
                    'Smart contract–powered payouts ensure winners get their rewards instantly.',
            },
            {
                icon: <FaGlobe size={20} />,
                content: 'Decentralized architecture – no single point of control, no unfair play.',
            },
            {
                icon: <FaCog size={20} />,
                content: `"Every answer you give is verified, every win you earn is transparent."`,
            },
        ],
    },
    {
        time: 'For Players',
        steps: [
            {
                icon: <FaRocket size={20} />,
                content: 'Spectator mode lets you watch epic quiz battles unfold in real time.',
            },
            {
                icon: <FaGlobe size={20} />,
                content:
                    'Join from anywhere in the world using just a unique code and your wallet.',
            },
            {
                icon: <FaMagic size={20} />,
                content: 'Use power-ups to survive tough rounds and outsmart rivals.',
            },
        ],
    },
    {
        time: 'For Hosts',
        steps: [
            {
                icon: <FaStar size={20} />,
                content: 'Create and publish your own quizzes with staked prize pools.',
            },
            {
                icon: <FaBolt size={20} />,
                content: 'Invite participants through unique codes – no complicated onboarding.',
            },
            {
                icon: <FaRocket size={20} />,
                content: `"From setup to payout, hosting is as fun as playing."`,
            },
        ],
    },
    {
        time: 'Play to Earn',
        steps: [
            {
                icon: <FaCog size={20} />,
                content: 'Earn crypto for your knowledge – the more you know, the more you win.',
            },
            {
                icon: <FaStar size={20} />,
                content:
                    'Turn learning into an investment. Each answer gets you closer to the prize.',
            },
            {
                icon: <FaCube size={20} />,
                content: `"Your curiosity is now your currency."`,
            },
        ],
    },
    {
        time: 'Beyond Quizzes',
        steps: [
            {
                icon: <FaCube size={20} />,
                content: 'Team battles and tournaments for large-scale, high-stakes competitions.',
            },
            {
                icon: <FaMagic size={20} />,
                content: 'Customizable rules, themes, and prize pools for unique quiz experiences.',
            },
        ],
    },
    {
        time: 'Developer Friendly',
        steps: [
            {
                icon: <FaStar size={20} />,
                content:
                    'Public APIs let developers integrate Minus Infinity into their own platforms.',
            },
            {
                icon: <FaBolt size={20} />,
                content:
                    'Real-time events and stats available via WebSocket for custom dashboards.',
            },
            {
                icon: <FaRocket size={20} />,
                content: `"Build on top of the game that rewards both brains and code."`,
            },
        ],
    },
    {
        time: 'Transparent Rewards',
        steps: [
            {
                icon: <FaCog size={20} />,
                content: 'Host approval triggers instant blockchain payouts to winners.',
            },
            {
                icon: <FaStar size={20} />,
                content: 'All transactions are on-chain – no hidden fees, no delays.',
            },
            {
                icon: <FaGlobe size={20} />,
                content: `"Every game, every winner, every payout – recorded for all to see."`,
            },
        ],
    },
    {
        time: 'The Future',
        steps: [
            {
                icon: <FaCog size={20} />,
                content:
                    'Evolving into a full learn-to-earn ecosystem with NFT-based achievements.',
            },
            {
                icon: <FaMagic size={20} />,
                content: 'Integrating AI-generated quizzes for unlimited challenges.',
            },
        ],
    },
];
