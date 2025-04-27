'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function TiltImage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = -((y - centerY) / centerY) * 20;
            const rotateY = ((x - centerX) / centerX) * 20;

            setTilt({ x: rotateX, y: rotateY });
        };

        const handleMouseLeave = () => {
            setTilt({ x: 0, y: 0 });
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-150 h-150 mx-auto mt-5 border border-gray-300 rounded-lg"
            style={{
                perspective: '500px',
            }}
        >
            <div
                className="w-full h-full transition-transform duration-150 ease-out"
                style={{
                    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transformStyle: 'preserve-3d',
                }}
            >
                <Image
                    src="/led.png"
                    alt="3D Tilt"
                    width={1000}
                    height={1000}
                    className="w-full h-full object-contain"
                    style={{
                        transform: 'translateZ(30px)',
                    }}
                />
            </div>
        </div>
    );
}
