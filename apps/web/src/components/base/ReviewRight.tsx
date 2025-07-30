'use client';

import { useState } from 'react';
import ReviewTextArea from '../ui/ReviewTextArea';
import { Button } from '../ui/button';
import axios from 'axios';
import { REVIEW_URL } from 'routes/api_routes';
import { Input } from '../ui/input';

export default function ReviewRight() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const submitReview = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {


    };

    return (
        <div className="flex flex-col gap-y-4 w-full h-full justify-end">

            <Input className="w-full px-6 py-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-lg text-white placeholder-white/60 shadow-md focus:outline-none focus:ring-2 focus:ring-white/20 transition duration-200"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Input className="w-full px-6 py-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-lg text-white placeholder-white/60 shadow-md focus:outline-none focus:ring-2 focus:ring-white/20 transition duration-200"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <ReviewTextArea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}

            />
            <Button onClick={submitReview}>Submit</Button>
        </div>
    );
}
