import React, { useState, useEffect, useRef } from 'react';
import { Typography } from 'antd';

const { Text, Title } = Typography;

const AnimatedCounter = ({
    end,
    duration = 2000,
    prefix = '',
    suffix = '',
    title,
    description,
    color = '#1890ff'
}) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const countRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => {
            if (countRef.current) {
                observer.unobserve(countRef.current);
            }
        };
    }, [isVisible]);

    useEffect(() => {
        if (isVisible) {
            let startTime;
            let animationFrame;

            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);

                // Easing function for smooth animation
                const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                const currentCount = Math.floor(easeOutCubic * end);

                setCount(currentCount);

                if (progress < 1) {
                    animationFrame = requestAnimationFrame(animate);
                }
            };

            animationFrame = requestAnimationFrame(animate);

            return () => {
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                }
            };
        }
    }, [isVisible, end, duration]);

    return (
        <div
            ref={countRef}
            style={{
                textAlign: 'center',
                padding: '20px',
                borderRadius: '12px',
                background: 'rgba(24, 144, 255, 0.04)',
                border: `1px solid ${color}20`,
                transition: 'all 0.3s ease',
            }}
        >
            <Title
                level={2}
                style={{
                    color,
                    margin: '0 0 8px 0',
                    fontSize: '2.5rem',
                    fontWeight: 'bold'
                }}
            >
                {prefix}{count.toLocaleString()}{suffix}
            </Title>
            {title && (
                <Title level={4} style={{ margin: '0 0 8px 0', color: '#333' }}>
                    {title}
                </Title>
            )}
            {description && (
                <Text type="secondary" style={{ fontSize: '14px' }}>
                    {description}
                </Text>
            )}
        </div>
    );
};

export default AnimatedCounter; 