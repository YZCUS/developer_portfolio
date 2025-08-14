import React, { useState } from 'react';
import { Card, Progress, Typography, Tooltip } from 'antd';
import { StarFilled } from '@ant-design/icons';

const { Title, Text } = Typography;

const SkillCard = ({ skill, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Generate skill level description
    const getSkillLevel = (level) => {
        if (level >= 90) return 'Expert';
        if (level >= 80) return 'Advanced';
        if (level >= 70) return 'Intermediate';
        if (level >= 60) return 'Beginner';
        return 'Learning';
    };

    // Generate star rating based on skill level
    const getStarRating = (level) => {
        return Math.ceil(level / 20);
    };

    const skillLevel = getSkillLevel(skill.level);
    const starRating = getStarRating(skill.level);

    return (
        <Card
            hoverable
            className="skills-card"
            style={{
                textAlign: 'center',
                height: '100%',
                borderRadius: '12px',
                animationDelay: `${index * 0.1}s`,
                transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                transition: 'all 0.3s ease',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            bodyStyle={{ padding: '24px' }}
        >
            <div style={{ marginBottom: '16px' }}>
                <Title level={4} style={{ marginBottom: '8px', color: '#1890ff' }}>
                    {skill.name}
                </Title>
                <Text type="secondary" style={{ fontSize: '14px' }}>
                    {skillLevel}
                </Text>
            </div>

            <div style={{ marginBottom: '16px' }}>
                <Tooltip title={`${skill.level}% proficiency`}>
                    <Progress
                        type="circle"
                        percent={skill.level}
                        format={percent => `${percent}%`}
                        strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        }}
                        strokeWidth={8}
                        size={100}
                        aria-label={`${skill.name} proficiency ${skill.level}%`}
                        style={{
                            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                            transition: 'transform 0.3s ease',
                        }}
                    />
                </Tooltip>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                    <StarFilled
                        key={i}
                        style={{
                            fontSize: '16px',
                            color: i < starRating ? '#faad14' : '#d9d9d9',
                            transition: 'color 0.3s ease',
                        }}
                    />
                ))}
            </div>
        </Card>
    );
};

export default SkillCard; 