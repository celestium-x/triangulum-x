import React from 'react';

interface ReviewTextAreaProps {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function ReviewTextArea({ placeholder, value, onChange }: ReviewTextAreaProps) {
    return (
        <textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            rows={4}
            className="w-full px-4 py-10 rounded-xl border border-white/20 bg-white/5 backdrop-blur-lg text-white placeholder-white/60 shadow-md focus:outline-none focus:ring-2 focus:ring-white/20 transition duration-200 resize-none"
        />
    );
}
