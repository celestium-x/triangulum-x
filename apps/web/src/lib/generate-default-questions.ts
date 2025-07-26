import { QuestionType } from '@/types/prisma-types';
import { v4 as uuid } from 'uuid';

export function generateDefaultQuestions(): QuestionType[] {
    const questions: Omit<QuestionType, 'id' | 'quizId' | 'imageUrl'>[] = [
        {
            question: 'What is the largest planet in our solar system?',
            options: ['Mercury', 'Venus', 'Earth', 'Jupiter'],
            correctAnswer: 3,
            explanation: 'Jupiter is the largest planet in our solar system.',
            difficulty: 1,
            basePoints: 100,
            timeLimit: 30,
            orderIndex: 0,
        },
        {
            question: "Which element has the chemical symbol 'O'?",
            options: ['Oxygen', 'Gold', 'Hydrogen', 'Silver'],
            correctAnswer: 0,
            explanation: "Oxygen is represented by the symbol 'O' in the periodic table.",
            difficulty: 1,
            basePoints: 100,
            timeLimit: 30,
            orderIndex: 1,
        },
        {
            question: 'What is the blockchain that powers Ethereum?',
            options: ['Bitcoin', 'Solana', 'Ethereum', 'Polkadot'],
            correctAnswer: 2,
            explanation: 'Ethereum is its own blockchain platform.',
            difficulty: 2,
            basePoints: 150,
            timeLimit: 40,
            orderIndex: 2,
        },
        {
            question: 'Which company created React?',
            options: ['Google', 'Facebook', 'Microsoft', 'Apple'],
            correctAnswer: 1,
            explanation: 'React was developed by Facebook.',
            difficulty: 1,
            basePoints: 100,
            timeLimit: 30,
            orderIndex: 3,
        },
        {
            question: "What does 'IPFS' stand for?",
            options: [
                'InterPlanetary File System',
                'Internet Protocol for Files',
                'Infinite Public File Storage',
                'Instant Protocol File System',
            ],
            correctAnswer: 0,
            explanation: 'IPFS stands for InterPlanetary File System.',
            difficulty: 3,
            basePoints: 200,
            timeLimit: 45,
            orderIndex: 4,
        },
        {
            question: 'Which one is a layer-2 solution on Ethereum?',
            options: ['Polygon', 'Binance Chain', 'Solana', 'Tezos'],
            correctAnswer: 0,
            explanation: 'Polygon is a layer-2 scaling solution for Ethereum.',
            difficulty: 2,
            basePoints: 150,
            timeLimit: 30,
            orderIndex: 5,
        },
        {
            question: 'Which of these is a Web3 wallet?',
            options: ['MetaMask', 'PayPal', 'Stripe', 'Google Pay'],
            correctAnswer: 0,
            explanation: 'MetaMask is a browser-based Web3 wallet.',
            difficulty: 1,
            basePoints: 100,
            timeLimit: 30,
            orderIndex: 6,
        },
        {
            question: 'What does DAO stand for?',
            options: [
                'Digital Autonomous Organization',
                'Decentralized Autonomous Organization',
                'Distributed Admin Organization',
                'Data Authority Office',
            ],
            correctAnswer: 1,
            explanation: 'DAO stands for Decentralized Autonomous Organization.',
            difficulty: 2,
            basePoints: 150,
            timeLimit: 30,
            orderIndex: 7,
        },
        {
            question:
                'Which programming language is primarily used for smart contracts on Ethereum?',
            options: ['JavaScript', 'Python', 'Solidity', 'C++'],
            correctAnswer: 2,
            explanation:
                'Solidity is the most commonly used language for Ethereum smart contracts.',
            difficulty: 2,
            basePoints: 150,
            timeLimit: 30,
            orderIndex: 8,
        },
        {
            question: "What is 'gas' in the Ethereum network?",
            options: ['Fuel for mining', 'Transaction fee', 'Data storage', 'Smart contract size'],
            correctAnswer: 1,
            explanation:
                'Gas is the fee required to perform a transaction or execute a smart contract on Ethereum.',
            difficulty: 2,
            basePoints: 150,
            timeLimit: 30,
            orderIndex: 9,
        },
    ];

    return questions.map((q, index) => ({
        ...q,
        id: uuid(),
        quizId: '',
        imageUrl: '',
        orderIndex: index,
    }));
}
