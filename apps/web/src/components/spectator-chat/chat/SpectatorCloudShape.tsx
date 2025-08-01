import React from 'react';

interface CloudShapeProps {
    children: React.ReactNode;
    className?: string;
}

export default function SpectatorCloudShape ({
    children,
    className = '',
}: CloudShapeProps) {



    return (
        <div className={`
      relative  px-6 py-3 text-white ${className}  transform transition-all duration-200
    `}>
            {children}
        </div>
    );
};